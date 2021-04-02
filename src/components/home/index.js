
import { Route, Redirect } from 'react-router-dom'
import './index.css';
import CatagoryBar from './catagoryBar';
import PostsView from './postsView'
import SinglePost from '../reuseableComponents/singlePost'
import SearchInputeFilde from './searchFilde'
function Home() {

  return (
    <div className="home">
      <div className="left-side">
        <div className="search-inpute">
           <SearchInputeFilde/>
        </div>
        <div className="catagory">
          <h3>Post Catagory</h3>
          <CatagoryBar />
        </div>
      </div>
      <div className="main">
        <Route exact path='/home' component={PostsView} />
        <Route exact path='/home/post/:postId' component={SinglePost} />
      </div>
    </div>
  );
}



export default Home;