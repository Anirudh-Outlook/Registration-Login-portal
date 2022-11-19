import axios from 'axios';
import React from 'react'
import { useContext, useState, useEffect } from 'react'

import { useLocation, useHistory } from 'react-router-dom';

const Login = props => {

  const location = useLocation(); const history=useHistory();
   const [p,setP]=useState(''); 
   const [str,setStr]=useState(location.state.sendId);
   const [pop,setPop]=useState(false)
  
useEffect(()=>{fetch(`http://localhost:8002/blogs/${str}`).then(res=>res.json()).then(resp=>{ setP(resp);console.table(resp);console.log("fetched"+str) });},[])


  return (
    <div style={{ backgroundImage: "url(" + "  https://images.pexels.com/photos/36487/above-adventure-aerial-air.jpg?cs=srgb&dl=pexels-bess-hamiti-36487.jpg&fm=jpg  " + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover', minHeight:'100vh',
    backgroundRepeat: 'no-repeat'}} ><br/>
    <div style={{paddingLeft:'960px', fontSize:'20px'}}>
<button style={{fontSize:'21px'}} type="button" class="btn btn-link" 
    onClick={(e)=>
    {
    e.preventDefault(); history.push({
           pathname: '/'
                                      });
        window.location.reload(false);
    }}> Home    </button>     &nbsp;&nbsp;
<button  style={{fontSize:'19px', paddingBottom:'10px'}} type="button" class="btn btn-link" 
    onClick={(e)=>
    {
    e.preventDefault(); history.push({
           pathname: '/log'
                                      });
        window.location.reload(false);
    }}>Login</button>&nbsp;&nbsp;
<button  style={{fontSize:'19px', paddingBottom:'10px'}} type="button" class="btn btn-link"  onClick={(e)=>
  {
    e.preventDefault(); history.push({
           pathname: '/reg',
           state:{p:{fn:'',ln:'',c:'',dob:'',phone:'',gen:'', cou:'INDIA', email:'',password:''}}
       });
        window.location.reload(false);
  }
      }  >Register</button>
&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <center><h1 style={{padding:'10px', color:'white'}} >  Details Page &nbsp;</h1></center>
          <br/><br/>
  <div  style={{ paddingLeft:'50px',color:'#61ADF8'}} >
   <h3>Hiii &nbsp;{p.fn} &nbsp;{p.ln}</h3>
    <h6 style={{paddingLeft:'30px'}} >Congrats, You have logged in successfully!</h6>
  </div>
<br/><br/>
<h6 style={{ paddingBottom:'15px' , paddingLeft:'120px', color:'#ff66cc' }} > Have a look at your Details {(p.gen=='male')?'gentleman':'madam'} :  </h6>
 <div style={{paddingLeft:'160px', width:'70%'}} >
  
<table style={{ padding:'50px', tabSize:'500px' ,backgroundColor:'#e6ffff', width:'600px', maxHeight:'20px', borderColor:'black' ,borderBlockColor:'black'}} class="table table-striped"  striped variant='dark'  border='1'>
  <thead>
  <tr><th scope="row">First Name :</th><td >{p.fn}</td></tr>
  <tr> <th scope="row">Last Name :</th><td>{p.ln}</td></tr>
  <tr><th scope="row">Class :</th><td>{p.c}</td></tr>
  <tr> <th scope="row">Date of Birth :</th><td>{p.dob}</td></tr>

  <tr><th scope="row">Phone Number :</th><td>{p.phone}</td></tr>
  <tr> <th scope="row">Email :</th><td>{p.email}</td></tr>
  <tr><th scope="row">Gender :</th><td>{p.gen}</td></tr>
  <tr> <th scope="row">Country :</th><td>{p.cou}</td></tr>

  </thead>
</table>
<br/>
</div>
<button type="button" class="btn btn-danger"  style={{position:'relative', left:'235px', width:'130px'}} onClick={()=>{setPop(!pop)}} > Delete </button>
<button type="button" class="btn btn-warning" style={{position:'relative', left:'460px', width:'130px'}} 
 onClick={(e)=>
  {  
    {
      e.preventDefault(); history.push({
      pathname: '/reg',
      state: {p},
                                       });
 window.location.reload(false);  
     }
  } 
          } > Edit </button>

<br/><br/>
{
pop?<div ><button style={{position:'absolute',left:'253px'}}  class="btn btn-outline-danger"   onClick={(e)=>
  {  
    e.preventDefault(); axios.delete(`http://localhost:8002/blogs/${str}`);history.push({
             pathname: '/'
       });
        window.location.reload(false);
  }
} >Are you sure to delete?</button></div>: null
}

<br/><br/><br/>

</div>
  )
}

export default Login