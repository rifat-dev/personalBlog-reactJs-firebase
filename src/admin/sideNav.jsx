
import { useState } from 'react';
import { Link } from 'react-router-dom'
import useStyles from './sidenav-style'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CloseIcon from '@material-ui/icons/Close';
import PostAddIcon from '@material-ui/icons/PostAdd';

function SideNav() {
    const [active, setActive] = useState('dashbord')
    const classes = useStyles();

    return (
        <>
            <div className={classes.sideNav} >
                {/* <div className={classes.top}>
                    <a className={classes.closeBtn} href="#">
                        <CloseIcon />
                    </a>
                </div> */}
                <div className="bottom">
                    <div
                        className={`${classes.sideNaveItem} ${active == 'dashbord' ? classes.active : ''}`}
                        onClick={(e) => setActive('dashbord')}
                    >
                        <i><DashboardIcon /></i>
                        <Link to="/admin/dashbord">
                            Dashbord
                            </Link>
                    </div>
                    <div
                        className={`${classes.sideNaveItem} ${active == 'post' ? classes.active : ''}`}
                        onClick={(e) => setActive('post')}
                    >
                        <i><ViewModuleIcon /></i>
                        <a href="#">Posts</a>
                    </div>
                    <div
                        className={`${classes.sideNaveItem} ${active == 'createpost' ? classes.active : ''}`}
                        onClick={(e) => setActive('createpost')}
                    >
                        <i><PostAddIcon /></i>
                        <Link to="/admin/dashbord/create-post">
                            Create Post
                            </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNav;
