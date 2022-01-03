import axios from 'axios'
import {useState, useEffect} from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import {Button, Grid} from '@material-ui/core'
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {getData} from './../redux/dataReducer'
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
  }
})


function Posts(props) {

  const [posts, setPosts] = useState([])
  
  const {classes} = props

  useEffect(() => {

    if(props.dataArr.data.length !== 0 ){
      setPosts(props.dataArr.data)
      console.log('redux fetch')
    }else{
      async function fetchAPI(){
        let res = await axios.get("https://my-worker.mustafakhan98.workers.dev/")
        setPosts(res.data)
        props.getData(res.data)
        console.log('api fetch')
      }

      fetchAPI()

    }

  }, [props])
    

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