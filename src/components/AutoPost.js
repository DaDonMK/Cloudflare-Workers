import axios from 'axios'
import { withStyles} from '@material-ui/core/styles'
import {Button, Grid} from '@material-ui/core'
import { Link } from "react-router-dom"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {connect} from 'react-redux'
import {getData} from './../redux/dataReducer'

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

function AutoPost(props){
    
    const {classes} = props

    function handleClick(){
        axios.get("https://my-worker.mustafakhan98.workers.dev/autopost")
        .then(res => {
            let temp = res.data
            console.log(temp)
            props.getData(res.data)
            toast.success("success: item added")
        })
        .catch(err => {
            console.log(err)
            toast.error("Server error: 500")
        })
    }

    return(
        <div>

            <Grid container className={classes.root}> 
                <Grid item xs>
                    <Link to="/"> 
                        <Button size="large" variant="contained" className={classes.homeBtnStyle}>Home</Button>
                    </Link>
                </Grid>
            </Grid>


            <Button
                    variant="contained"
                    size="large"
                    className={classes.buttonStyle}
                    onClick={handleClick}
                >
                    Click to make Auto Post
            </Button>
        </div>
    )
}

function mapStateToProps(state) {

  return({ 
    dataArr: state.dataArr,
    // giveMeName: state.giveMeName
  })
}

export default connect(mapStateToProps, {getData})(withStyles(styles)(AutoPost))


// export default withStyles(styles)(AutoPost);