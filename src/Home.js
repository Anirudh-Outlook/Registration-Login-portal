import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css';
import { useLocation, useHistory } from 'react-router-dom';
const Home = () => {
  const [p,setP]=useState({fn:'',ln:'',c:'',dob:'',phone:'',gen:'', cou:'INDIA', email:'',password:''})
  console.log("Home"); 
  const location = useLocation(); const history=useHistory();
  return (
    <div  style={{backgroundColor:'lavender',height: '100vh', minHeight : '100vh'}}><center><br/><br/> 
   <div className='GFG1' style={{fontStyle:'italic', textAlign:'center', }}>
     <h1 style={{ color:'green', position:'absolute', right:'510px'}}>Welcome Back</h1> <br/>
    <br/><br/>  
<h6 style={{color:'darkslateblue', paddingLeft:'45px'}}> we have 3 other screens..... Registration, Login and Details screens </h6>
    </div>  <br/>
    <button  type="button" class="btn btn-success"  
onClick={   (e)=>
  {
    e.preventDefault(); history.push({
           pathname: '/reg',
           state:{p}
       });
        window.location.reload(false);
  }
      } > Register</button> &nbsp;

<a href='/log' type='button' ><button  type="button" class="btn btn-warning" > Login</button></a>
    </center>
  </div>
  )
}

export default Home
