import './App.css';
import { connect } from 'react-redux'
import Dashbord from './admin/dashbord';
import Admin from './admin/index'
import Home from './components/home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/AppBar/nav'
import SignUp from './components/auth/signUp';
import SignIn from './components/auth/signIn';
import PrivateRoute from './components/protectedRoute/privateRoute'

function App(props) {
  const { isLoggedIn, isAdmin } = props.user
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/admin">
            <Admin/>
          </PrivateRoute>
          <div>
            <NavBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(App);
