import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    sideNav:{
        height:'100vh',
        width:'20%',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
        position: 'fixed',
        fontSize:'20px',
        '& a':{
            color:'white'
        }
    },
    top:{
       marginBottom:'35px',
    },
    sideNaveItem:{
       width:'100%',
       marginTop:'10px',
       padding:'8px 10px',
       color:'white',
       '& i':{
           fontSize:'18px',
           marginRight:'10px',         
       },
       '& a':{
           textDecoration:'none'
       },
       '&:hover':{
        backgroundColor:'white',
        color:'black',
        '& a':{
            color:'black',
        }
    },
    },
    closeBtn:{
        position:'absolute',
        top:'0',
        right:'10px',
    },
    active:{
        background:'white',
        color:'black',
        '& a':{
            color:'black',
        },
    }
});

export default useStyles;