import { useState, useEffect } from 'react'
import db, { storage } from '../components/firebase/firebase-confige'
import { Card, CardImg, CardBody, Row, Col, Form, Button, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import { createPost } from '../components/store/actions/postAction';
import firebase from 'firebase/app'
import postCatagory from '../components/reuseableComponents/postCatagory'





const CreatePost = ({createPost}) => {
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [url, setURL] = useState("");
    const [catagory, setCatagory] = useState("")

    // tenymc
    const handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
        setBody(content);
    }



    // image uplode
    const handleChange = (e) => {
        const imgFile = e.target.files[0];
        const uploadTask = storage.ref(`/images/${imgFile.name}`).put(imgFile);
        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
                .ref("images")
                .child(imgFile.name)
                .getDownloadURL()
                .then((url) => {
                    setURL(url);
                    console.log("uplode success ")
                });
        });
    }


    const onHandelSubmit = (e) => {
        e.preventDefault();
        const post = {
            title: title,
            body: body,
            thumble: url ?? '',
            CreatedAt: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
            catagory: catagory,
            likes: [],
            comments: []
        }

        db.collection("posts").add(post)
            .then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                createPost(post)
                setBody("")
                setTitle("")
                setURL("")
                setCatagory("")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });


    }

    return (

        <>

            <Row>
                <Col sm="6" style={{
                    margin: '0 auto',
                    marginTop: '30px'
                }}>
                    <h1>Create A Post</h1>
                    <Card body>
                        <CardBody>
                            {url &&
                                <FormGroup>
                                    <Label>Post Thumble</Label>
                                    <CardImg top width="100%" src={url} alt="Card image cap" />
                                </FormGroup>
                            }
                            <Form onSubmit={onHandelSubmit} >
                                <FormGroup>
                                    <Label for="text">Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="text"
                                        value={title}
                                        placeholder="title.."
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup >
                                    <Label for="exampleSelect">Catagory</Label>
                                    <Input
                                        type="select"
                                        name="select"
                                        id="exampleSelect"
                                        value={catagory}
                                        onChange={(e) => setCatagory(e.target.value)}
                                    >
                                        <option>select catagory</option>
                                        {postCatagory.map(cat => (
                                            <option key={cat} >{cat}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="body">Post Body</Label>
                                    <Editor
                                        name="post-image"
                                        apiKey='nt3i8whkt7e9w86d88yu1khn9dj0upprnlewzyebpepfe8r8'
                                        initialValue={body}
                                        outputFormat='text'
                                        init={{
                                            height: 300,
                                            menubar: true,
                                            plugins: [
                                                'advlist autolink lists link paste image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],

                                            toolbar:
                                                'undo redo | formatselect | bold italic backcolor forecolor | \
                                                 alignleft aligncenter alignright alignjustify | \
                                                 bullist numlist outdent indent | removeformat | help',

                                            automatic_uploads: true,
                                            images_upload_url: '/uplodes',
                                            images_upload_handler: function (blobinfo, success, fail) {
                                                
                                                let formData = new FormData();
                                                formData.append('post-image', blobinfo.blob(), blobinfo.filename())
                                                console.log(formData)
                                                // const uploadTask = storage.ref(`/images/${imgFile.name}`).put(imgFile);
                                                // uploadTask.on("state_changed", console.log, console.error, () => {
                                                //     storage
                                                //         .ref("images")
                                                //         .child(imgFile.name)
                                                //         .getDownloadURL()
                                                //         .then((url) => {
                                                //             setURL(url);
                                                //             console.log("uplode success ")
                                                //         });
                                                // });
                                            }
                                        }}
                                        onEditorChange={handleEditorChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="thumble">Chose a thumble</Label>
                                    <CustomInput
                                        type="file"
                                        id="thumble"
                                        name="customFile"
                                        onChange={handleChange}
                                    />
                                </FormGroup>

                                <Button color="primary" size="lg" block>Create Post</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default connect(null, {createPost})(CreatePost);
