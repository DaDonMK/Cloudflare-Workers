import axios from 'axios'
import {useState, useEffect} from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import {Button, Grid} from '@material-ui/core'
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {getData} from './../redux/dataReducer'
// import { MdThumbUp } from "react-icons/md";
import "../App.css"

const styles = theme => ({

  root: {
    overflowWrap: 'break-word',
    paddingLeft: '10em',
    paddingRight: '10em'
  },

  buttonStyle: {
    marginTop: '4em',
    marginBottom: '2em'
  },

  // likeBtn:{
    
  // }
})


function Posts(props) {

  const [posts, setPosts] = useState([])
  const [load, setLoad] = useState(false)

  
  const {classes} = props

  useEffect(() => {

    if(props.dataArr.data.length !== 0 ){
      setPosts(props.dataArr.data)
      console.log('redux fetch')
      console.log(props.dataArr.data)
    }else{
      async function fetchAPI(){
        let res = await axios.get("https://cloudflare.mustafakhan98.workers.dev/")
        setPosts(res.data)
        console.log(res.data)
        props.getData(res.data)
        console.log('api fetch')
      }

      fetchAPI()

    }

  }, [props])


  const handleUpVote = async (id) => {
    //posts.length - id - (arr[arr.length - 1] - 1)
    let index = posts.length - id
    console.log(posts)

    props.getData(posts)


    posts[index].upvote += 1

    let res = await axios.put("https://shielded-sea-81384.herokuapp.com/https://cloudflare.mustafakhan98.workers.dev/upvote", {posts: posts})
    console.log(res.data)
    
  } 
    

  return (
    <div className="App">
        <div className="span-btns"> 
            <Link to="/newpost">
                <Button
                    variant="contained"
                    size="large"
                    className={classes.buttonStyle}
                >
                    Make Post
                </Button>
            </Link>
            <Link to="/autopost">
                <Button
                    variant="contained"
                    size="large"
                    className={classes.buttonStyle}
                >
                    Auto Post
                </Button>
            </Link>
        </div>


      {posts ? 
       posts.map((e, i) => {
          return <div key={i} className="main-content">
              <br/> 
              {e.image === "" ? <p>NO IMAGE AVAILABLE</p> : 
                <img src={e.image} alt="all pictures" className="all-pictures" width="15%"/>   
              }
              <br />
              
              <Grid container className={classes.root}> 
                <Grid item xs> 
                    <Typography variant="h6"><b>{e.title}</b></Typography> <br/>  
                </Grid>
              </Grid>

              <Grid container className={classes.root}> 
                <Grid item xs> 
                    <Typography variant="subtitle1"> by: {e.username} </Typography> <br /> 
                </Grid>
              </Grid>

              <Grid container className={classes.root}> 
                <Grid item xs> 
                    <Typography variant="body1">{e.content}</Typography> 
                </Grid>
              </Grid>
              <br />
              <Typography variant="body3">{e.upvote} likes</Typography>
              <br />
              <Button variant="outlined" disabled={load} onClick={() => {
                setLoad(true)
                handleUpVote(e.id).then(() => setLoad(false))
              }}>Upvote</Button>
          </div>
      })
      : null}
    </div>
  );
}

function mapStateToProps(state) {
  return({ 
    dataArr: state.dataArr,
  })
}
export default connect(mapStateToProps, {getData})(withStyles(styles)(Posts))