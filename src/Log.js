import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


const Log = () => { const history=useHistory();
    const [email,setEmail]=useState('');  const [pass,setPass]=useState(''); 
    let sendId='' ;   const [err,setErr]=useState('');
  const [p1,setP1]=useState();
  const [p,setP]=useState({fn:'',ln:'',c:'',dob:'',phone:'',gen:'', cou:'INDIA', email:'',password:''})
  const [log,setLog]=useState(); const [log1,setLog1]=useState()
   
useEffect(()=>{fetch("http://localhost:8002/blogs").then(res=>res.json()).then(resp=>{ setP1(resp);console.log("p1 is"); console.table(p1) });},[])

  const cli=e=>
{                 e.preventDefault();          console.table(p1);
      {p1.map((f,i)=>
        {   console.log("in map"); 
          if(f.email===email && f.password===pass)
          { sendId=f.id; setLog1(true)
                history.push({
                   pathname: '/login',
                   state: {sendId}, //id matrame sending; next page lo id tho details fetch chestam
                             });
            window.location.reload(false);
          }  
          else {  setLog(true) }
        }     )
      }    
}



  return (
          <div style={{fontStyle:'italic', textAlign:'center',  backgroundImage: "url(" + "http://wallpapers.net/web/wallpapers/spot-light-background-hd-wallpaper/thumbnail/lg.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover', height:'100vh',
          backgroundRepeat: 'no-repeat'}}>
  {/* <div style={{backgroundColor:'#ffe6cc',minHeight:'100vh' ,padding:'20px', paddingBottom:'5px'}}> */}

     <div style={{paddingLeft:'1020px', fontSize:'20px'}}><br/>
<button  style={{fontSize:'22px', color:'yellow'}} type="button" class="btn btn-link"  onClick={(e)=>
  {
    e.preventDefault(); history.push({
           pathname: '/reg',
           state:{p}
       });
        window.location.reload(false);
  }
      }  >Register</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<button style={{fontSize:'22px', color:'yellow'}} type="button" class="btn btn-link" 
onClick={(e)=>
    {
    e.preventDefault(); history.push({
           pathname: '/'
                                      });
        window.location.reload(false);
    }}> Home    </button>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      
      <br/><br/>
  <center><h1 style={{padding:'10px',  width:'350px', color:'#003366'}} >  LOGIN PAGE &nbsp;</h1>
          <br/><br/>
 
     <h4 style={{color:'#cc6699'}}> <table ><tbody>
    <tr> <td>   Email : </td><td  class="col-md-1"></td><td><input type='text' name='email' value={email} style={{height:'50px', borderColor:'blue'}} onChange={(e)=>setEmail(e.target.value)} /></td></tr>
   <br/> <tr>  <td>  Password :</td><td ></td><td> <input type='password' name='pass' value={pass} style={{height:'50px' , borderColor:'blue'}}  onChange={(e)=>setPass(e.target.value)} /></td></tr>
        
        </tbody></table></h4>

{log===true?log1===true? '' : <h6 className='Err'>Invalid Credintials</h6>    : ''  } 
<br/><br/>  <button onClick={cli} style={{width:'150px', height:'40px', backgroundColor:'#3069a1'}}  type="button" class="btn btn-dark" >Login</button> 
</center>
</div>
    // </div>
  )
}

export default Log