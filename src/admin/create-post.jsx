import { useState, useEffect } from 'react'
import db , { storage} from '../components/firebase/firebase-confige'
import { Card, CardImg, CardBody, Row, Col, Form, Button, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import { createPost } from '../components/store/actions/postAction';

const CreatePost = () => {
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    // tenymc
    const handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
        setBody(content);
    }



    // image uplode
    const handleChange = (e) => {
        setFile(e.target.files[0]);

    }

    const uplodeImage = () => {
        console.log(file)
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then((url) => {
                    setFile(null);
                    setURL(url);
                    console.log("uplode success " + url)
                });
        });
    }

    useEffect(() => {
        if (file) {
            uplodeImage()
        }
    }, [file])


    const onHandelSubmit =  (e) => {
        e.preventDefault();
        const post = {
            title: title,
            body: body,
            thumble: url ?? '',
            likes: [],
            comments: []
        }

        db.collection("posts").add(post)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
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
                                        placeholder="title.."
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="body">Post Body</Label>
                                    <Editor
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
                                                'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
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

export default connect(null, { createPost })(CreatePost);
