import { useEffect } from 'react'
import {Route,Redirect} from 'react-router-dom'
import './index.css';
import { connect } from 'react-redux'
import { getAllPost } from '../store/actions/postAction'
import CatagoryBar from './catagoryBar';
import PostCard from '../reuseableComponents/postCard'
import PostsView from './postsView'
import SinglePost from '../reuseableComponents/singlePost'
function Home({ posts}) {


  useEffect(() => {getAllPost()}, [posts])

  return (
    <div className="home">
      <div className="catagory">
        <h3>Post Catagory</h3>
        <CatagoryBar />
      </div>
      <div className="main">
        <Route exact path='/home' component={PostsView} />
        <Route exact path='/home/post/:postId' component={SinglePost} /> 

        {/* {posts.map((post) => (
          <div key={post.title} className="col-6">
            <PostCard key={post.title} post={post} />
          </div>
        ))} */}

      </div>
    </div>
  );
}

const mapStateFromProps = state => ({
  posts: state.posts
})

export default connect(mapStateFromProps, { getAllPost })(Home);