import { useState, useEffect } from 'react'
import './index.css';
import Spinner from '../reuseableComponents/spinner'
import { connect } from 'react-redux'
import { getAllPost, likeDislike } from '../store/actions/postAction'
import { getAllComments } from '../store/actions/commentAction'
import PostCard from '../reuseableComponents/postCard'

function PostsView({ posts, user, getAllPost, getAllComments }) {

    useEffect(() => {
        getAllPost();
        getAllComments();
    }, [])

    useEffect(() => {

    }, [posts])
    
    if (posts.length != 0) {
        return (

            <>
                {posts.map((post) => (
                    <div key={post.title} className="col-6">
                        <PostCard key={post.title} post={post} user={user} />
                    </div>
                ))}
            </>
        );
    } else {
        return (

            <>
               <Spinner/>
            </>
        );
    }
}

const mapStateFromProps = state => ({
    posts: state.posts,
    user: state.user
})

export default connect(mapStateFromProps, { getAllPost, getAllComments })(PostsView);