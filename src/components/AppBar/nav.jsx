import { useState } from 'react'
import { connect } from 'react-redux';
import { LogOut } from '../store/actions/authAction'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function NavBar({ user, LogOut }) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        // setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);

    };

    const logOut = () => {
        LogOut()
    }

    return (
        <div className={classes.root}>
            {/* <FormGroup>
                <FormControlLabel
                    control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup> */}
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}

                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit">
                            <Link style={{ color: 'white' }} to="/">
                                Home
                            </Link>
                        </Button>
                    </Typography>

                    {user.isLoggedIn ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                {user.isAdmin ? (
                                    <div>
                                        <MenuItem onClick={handleClose}>

                                            <Link  to="/admin/dashbord">
                                                Dashbord
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose,logOut}>LogOut</MenuItem>
                                    </div>
                                ) : (
                                    <div>
                                        <MenuItem onClick={handleClose,logOut}>LogOut</MenuItem>
                                    </div>
                                )}
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <Button color="inherit">
                                <Link style={{ color: 'white' }} to="/login">
                                    LogIn
                                </Link>
                            </Button>
                            <Button color="inherit">
                                <Link style={{ color: 'white' }} to="/signup">
                                    Registation
                                </Link>
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { LogOut })(NavBar)