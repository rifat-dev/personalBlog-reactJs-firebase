
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import catagory from '../reuseableComponents/postCatagory'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function CatagoryBar({posts}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {catagory.map((cat) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{cat}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {posts && posts.map((post)=> post.catagory=== cat && (
                <Link to={`/home/post/${post.id}`} ><h5 style={{padding:'4px'}} >{post.title}</h5></Link>
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}


    </div>
  );
}

const mapTostateFromProps = state =>({
  posts: state.posts
})

export default connect(mapTostateFromProps)(CatagoryBar);
