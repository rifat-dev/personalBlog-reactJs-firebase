import {useState} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({user,children , ...rest}) {
    const [auth,setAuth] = useState(true)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />

    )
}

const mapToState = state => ({
    user: state.user
})

export default connect(mapToState)(PrivateRoute);
