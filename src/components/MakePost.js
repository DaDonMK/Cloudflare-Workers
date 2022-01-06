import axios from 'axios'
import {useState} from 'react'
import {Grid, TextField, Button} from '@material-ui/core'
import { withStyles} from '@material-ui/core/styles'
import { Link } from "react-router-dom"
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import {getData} from './../redux/dataReducer'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'

toast.configure()

const styles = theme => ({

  root: {
    display: 'flex',
    flexGrow: 1,
    '& > *': {
      margin: '1%',
    },
    marginLeft: '10px'
  },

  buttonStyle: {
      marginTop: '4em'
  },

  homeBtnStyle: {
      display: 'flex',
  }
})

function MakePost(props) {

  const [title, setTitle] = useState("")
  const [username, setUsername] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")

  const {classes} = props

  function handleClick(){

    if(title === "" || username === "" || content === ""){
        toast.error('Make sure to fill all inputs!')
        return 
    }
    //https://shielded-sea-81384.herokuapp.com/
    axios.put("https://shielded-sea-81384.herokuapp.com/https://cloudflare.mustafakhan98.workers.dev/makepost", {"title": title, "username": username, "content": content, "image": image})
    .then(res => {
        console.log(res.data)
        toast.success("success: item added")
        props.getData(res.data)
    })
    .catch(err => {
        console.log(err)
        toast.error("Server error: 500")
    })
  }

  return (
      <div className = "input-container">

          <Grid container className={classes.root}>
            <Grid item xs>
                <Link to="/"> 
                    <Button size="large" variant="contained" className={classes.homeBtnStyle}>
                        Home
                    </Button>
                </Link>
            </Grid>
        </Grid>
        <Grid container className={classes.root}>
            <Grid item xs>
                <TextField placeholder="Enter Title..." onChange={e => setTitle(e.target.value)}/>
            </Grid>
        </Grid>
        <Grid container className={classes.root}>
            <Grid item xs>
                <TextField placeholder="Enter Username..." onChange={e => setUsername(e.target.value)}/>
            </Grid>
        </Grid>
        <Grid container className={classes.root}>
            <Grid item xs>
                <TextField placeholder="Enter Content..." variant="outlined"  multiline rows={8} onChange={e => setContent(e.target.value)}/>
            </Grid>
        </Grid>
        <Grid container className={classes.root}>
            <Grid item xs>
                <TextField placeholder="Enter Image/GIF URL..." label="Optional" onChange={e => setImage(e.target.value)}/>
            </Grid>
        </Grid>
        <Grid container className={classes.root}>
            <Grid item xs>
                <Button
                    variant="contained"
                    size="large"
                    className={classes.buttonStyle}
                    onClick={handleClick}
                >
                    Send
                </Button>                
            </Grid>
        </Grid>

      </div>
  );
}

function mapStateToProps(state) {
  return({ 
    dataArr: state.dataArr,
  })
}

export default connect(mapStateToProps, {getData})(withStyles(styles)(MakePost))