import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import Dashbord from './dashbord'
import CreatePost from './create-post'
import SideNav from './sideNav'

function Admin() {
  return (
    <BrowserRouter>
      <div className="row">
        <div className="col-left">
          <SideNav />
        </div>
        <div className="col-right">
          <Switch>
            <Route exact path='/admin/dashbord' component={Dashbord} />
            <Route exact path='/admin/dashbord/create-post' component={CreatePost} />
            <Route path="/admin">
              <Redirect to={{ pathname: '/admin/dashbord' }} />
            </Route>

          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Admin;