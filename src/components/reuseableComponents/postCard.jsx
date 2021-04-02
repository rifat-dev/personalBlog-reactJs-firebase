import { useEffect } from 'react'
import CommentList from './comments'
import { likeDislike } from '../store/actions/postAction'
import { createComment } from '../store/actions/commentAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';


import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        backgroundColor: red[500],
    },
    textField: {
        width: '100%',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));


function PostCard({ post, user, likeDislike, createComment ,comments }) {

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [postsComments , setPostComments] = useState([])
    const [comment, setComment] = useState("");
    const [render, setRender] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const postLikeDislike = () => {
        var index = post.likes.indexOf(user.user.uid);
        index >= 0 ? post.likes.splice(index, 1) : post.likes.push(user.user.uid)
        likeDislike(post);
        setRender(render ? false : true);
    }

    const handelComment = (e) => {
        e.preventDefault();

        if (comment) {
            const postComment = {
                text: comment,
                userName: `${user.user.firstName} ${user.user.lastName}`,
            }
           
            createComment(post,postComment);
            setRender(render ? false : true);
           
        }
    }
    


    useEffect(() => {
        let newComments = []
        if(comments){
            newComments = comments.filter(comment => {
                if(post.comments.indexOf(comment.id) >= 0){
                    return comment
                }
            })
            setPostComments([...newComments])
            
        }
     }, [render])

    return (
        <Card className={classes.root} >
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                title={post.title}
                subheader={post.catagory}
            />
            <CardMedia
                className={classes.media}
                image={post.thumble ? post.thumble : ''}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Link style={{ color: 'black' }} to={`/home/post/${post.id}`}>
                        {`${post.body.substr(0, 100)} more..`}
                    </Link>
                </Typography>
            </CardContent>

            {user.isLoggedIn ? (
                <>
                    <CardActions disableSpacing>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={postLikeDislike}

                            color={post.likes.indexOf(user.user.uid) >= 0 ? "secondary" : ''}
                        >
                            <FavoriteIcon />
                            {post.likes.length}
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="share"

                        >
                            <QuestionAnswerIcon />
                                      comments
                                 </IconButton>

                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {postsComments.length > 0 ? (
                                <Typography paragraph>
                                    {postsComments.map(c=>(
                                        <CommentList comment={c} />
                                    ))}
                                </Typography>
                            ) : (
                                <Typography paragraph>
                                    There is no comments !
                                </Typography>
                            )}
                        </CardContent>
                        <CardContent>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="standard-adornment-password">Comment</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handelComment}
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </CardContent>
                    </Collapse>
                </>
            ) : (
                <CardActions>
                    <Link to='/login' >
                        <Typography paragraph>LogIn for Like && comments</Typography>
                    </Link>
                </CardActions>
            )}

        </Card >
    );
}

const mapTostateFrom = state =>({
    comments:state.comments
})

export default connect(mapTostateFrom, { likeDislike, createComment })(PostCard);
