import { useEffect } from 'react'
import './index.css';
import { connect } from 'react-redux'
import { getAllPost } from '../store/actions/postAction'
import PostCard from '../reuseableComponents/postCard'



function PostsView({ posts, user, getAllPost }) {

 
    useEffect(() => {
        getAllPost();
    },[])


    return (

        <>
            {posts.map((post) => (
                <div key={post.title} className="col-6">
                    <PostCard key={post.title} post={post} user={user} />
                </div>
            ))}
        </>
    );
}

const mapStateFromProps = state => ({
    posts: state.posts,
    user: state.user
})

export default connect(mapStateFromProps, { getAllPost })(PostsView);