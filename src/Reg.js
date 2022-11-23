import React, { useState, useMemo, useEffect } from 'react'
import './App.css'
import { useHistory , useLocation} from 'react-router-dom';
import {  TextField } from '@mui/material';
import countryList from 'react-select-country-list'
import Select from 'react-dropdown-select';
import axios, { Axios } from 'axios';


const Reg = props => {
  
  const location = useLocation();
  
const [det,setDet]=useState(location.state.p);
console.log("showing det : ")
  console.table(det)
let ed=location.state.p.fn==''?false:true
console.log("ed? :   "+ed)


let sendId=0 ; let sl;
useEffect(()=>{fetch(`http://localhost:8002/blogs/`).then(res=>res.json()).then(resp=>{sendId=resp[resp.length-1].id; console.log("effect send id :  "+sendId); sl=resp; console.table(sl);})},)


 const history=useHistory();

const [pp,setPp]=useState(''); 
const [k,setK]=useState(false)

const emailHandler=e=>{{ setIsSubmit(false);
  if (e.target.value<0){    e.preventDefault();    }   
  else setDet({...det,[e.target.name]:e.target.value.toLowerCase()});}}  

const typeHandle=e=>{{ setIsSubmit(false);
  if (e.target.value<0){    e.preventDefault();    }   
  else setDet({...det,[e.target.name]:e.target.value});}}  

const phoneHandle=e=>
  {
    { setIsSubmit(false);
      if (e.target.value<0){    e.preventDefault();    }   
      else {        
        const { value } = e.target;   
        const re = /^[0-9]+$/;
        if (value === "" || re.test(value)) 
     {     setDet({...det,[e.target.name]:value});     }
           
            }     
    }
 }  
  
const nameHandle=e=>
{{ setIsSubmit(false);
    if (e.target.value<0){    e.preventDefault();    }   
    else {        
      const { value } = e.target;   
      const re = /^[A-Za-z ]+$/;
      if (value === "" || re.test(value)) 
   {     setDet({...det,[e.target.name]:value});     }
         
          }     
}}  


//list of countries
const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
 
//dropdown handler
const dropHandler = value => {
    setValue(value); det.cou=value[0].label
  }
//class >0 && <=12
const classHandler=e=>
{
  if(e.target.value<13 && e.target.value>0) { setDet({...det,[e.target.name]:e.target.value});}
}

  const [isSubmit,setIsSubmit]=useState(false); //to use at save button
const [er,setEr]=useState({}) //errors lists 
let erCount=0 //count of errors 
  
const  submitHandler =e=>
  { e.preventDefault();
    setEr(validator()); 
    console.log(erCount+"  error count :  ")
  }

function validator()
{
  const erro={}; erCount=0;
 let len=sl.length-1;
 if(/\S+@\S+\.\S+/.test(det.email)){ //email format
while(len>=0)
{ 
  if( !ed && sl[len].email===det.email){ erro.email='Email is not unique'; erCount=erCount+1; break;}
  len=len-1; 
}} else{erro.email='Invalid email address'; erCount=erCount+1;}

if(det.fn.trim().length<4){if(det.fn.trim()==''){ erro.fn='First Name is required'; erCount=erCount+1; } else{ erro.fn='Minimum 4 characters'; erCount=erCount+1;}}
    if(det.c==''){ erro.c='Class is required'; erCount=erCount+1;}
    if(det.dob==''){ erro.dob='Date Of Birth is required'; erCount=erCount+1;}
    if(det.email.trim()==''){ erro.email='Email is required'; erCount=erCount+1;}  

    if(det.email.trim()!==''){
      for (let index = 0; index < sl.length-1; index++)   {
      if(sl[index]===det.email.trim()){erro.email='email already exists'; erCount=erCount+1;  }      
    }}  
    
    if(det.gen==''){ erro.gen='Gender is required'; erCount=erCount+1;}
    if(det.phone.length>0 && det.phone.length!=10){ erro.phone='phone number must have 10 digits'; erCount=erCount+1;}
 if(det.password.length<5){if(det.password.trim()==''){ erro.pw='Password is required'; erCount=erCount+1;} else { erro.pw='Minimum 5 characters'; erCount=erCount+1}}
    if(pp!=det.password){erro.cp='Passwords does not match';erCount=erCount+1;}
  console.table(erro);console.table(det); if(erCount===0){    setIsSubmit(true);  } else{setIsSubmit(false)}
  return erro;
}


        return (

          <div style={{fontStyle:'italic',  backgroundImage: "url(" + " https://1.bp.blogspot.com/-_B1NQqcUjG4/X58l93-TU-I/AAAAAAAAIAc/D464CPe7jjEm0XrZ7HNSNE8CsUPE2GBfQCLcBGAsYHQ/s960/background-ppt-white-shades.jpg  " + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover', minHeight:'100vh',
          backgroundRepeat: 'no-repeat'}}>

          <a  style={{ paddingTop:'70px', paddingLeft:'140px' }} >

  <div style={{paddingLeft:'1050px', fontSize:'20px'}}><a href='/log' >Login</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='/'>Home</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div style={{paddingLeft:'200px'}} >
            <h1 style={{padding:'10px', paddingLeft:'120px'}} >  The Registration Page </h1>
          <br/><br/>
      
      <form onSubmit={submitHandler}>
              <TextField label="First Name *" variant="filled"  onChange={nameHandle} name='fn' value={det.fn}  color="success" style={{width:'320px'}}  focused /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TextField label="Second Name" variant="filled"  onChange={nameHandle} name='ln' value={det.ln} focused color='success'  style={{width:'320px'}}  /> <br/>
          <h6 className='Err' style={{ marginTop:'1px', fontSize:'12px' }} >{er.fn}</h6>  <br/>
              <TextField type='number' label="class (1-12) *" variant="filled"  onChange={classHandler}  value={det.c}  name='c' focused color='secondary'  style={{ width:'320px'}} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/>
          <h6 className='Err' style={{ marginTop:'1px', fontSize:'12px' }} >{er.c}</h6>  <br/>
              <TextField  InputProps={{inputProps: { min: "1900-01-01", max: "2012-12-31"} }} type='date' selected={det.dob} label="Date of Birth *" variant="filled" onChange={typeHandle} name='dob' value={det.dob} focused color='warning'  style={{width:'320px'}} >   Age:  </TextField>   <br/>
          <h6 className='Err' style={{ marginTop:'1px', fontSize:'12px' }} >{er.dob}</h6>  <br/>    
              <div style={{ width:'320px', borderTopWidth:'0px',borderLeftWidth:'0px',borderRightWidth:'0px', "borderBottomWidth":"2px",  'borderColor':'paleVioletRed', 'borderStyle':'ridge', minHeight:'56px', padding:'10px',backgroundColor:'#e5e8e9' }} onChange={(e)=>det.gen=e.target.value}> 
          <h6 style={{color:'DarkSlateBlue', }} > Gender * :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <TextField type='radio' name='gen' value='male' color='primary'/> Male  &nbsp;&nbsp;&nbsp;
               <TextField type='radio' name='gen' value='female' color='secondary' /> Female
                  </h6></div>
          <h6 className='Err' style={{ marginTop:'1px', fontSize:'12px' }} >{er.gen}</h6>  <br/>    

              <Select options={options} name='cou' value={det.cou} onChange={dropHandler} placeholder={det.cou} style={{ width:'320px', borderTopWidth:'0px',borderLeftWidth:'0px',borderRightWidth:'0px', "borderBottomWidth":"2px",  'borderColor':'#000099', 'borderStyle':'ridge', minHeight:'56px', padding:'10px', backgroundColor:'#e5e8e9'}} /><br/>
             
              <TextField type='text' label="Phone number" variant="filled"  InputProps={{inputProps: { maxLength:10} }} onChange={phoneHandle}  value={det.phone} name='phone' focused  color='error'   style={{ width:'320px'}} />  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             
              <TextField type='text' label="Email *" variant="filled"  onChange={emailHandler}  value={det.email} name='email' color='error' focused style={{ width:'320px'}} /> <br/>   
              <h6 className='Err' style={{ marginTop:'1px', fontSize:'12px' , paddingLeft:'13px', display: 'inline'}} >{er.phone}</h6>                     
              <h6 className='Err' style={{ marginTop:'1px', fontSize:'12px' ,  display: 'inline' , position:"absolute", left:'551px'}} >{er.email}</h6>  <br/>                     
              <TextField type={k?'text':'password'} label="Password *" variant="filled"  onChange={typeHandle} name='password' value={det.password}  color="info" style={{width:'320px'}} focused  /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          
              <TextField type='password' label="Confirm Password *" variant="filled"  onChange={(e)=>{setIsSubmit(false);setPp(e.target.value)}} name='cp' value={pp}  color="info" style={{width:'320px'}} focused  /> <br/>  
          {/* &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;   */}
          <a style={{fontSize:'14px', color:'purple',position:'absolute',left:'400px',}}> <TextField type='checkbox' label="confirm password" variant="filled" color='secondary' onClick={()=>setK(!k)} /> show password </a>
          <h6 className='Err' style={{ marginTop:'1px', fontSize:'12px' }} >{er.pw}</h6>            
      
      <br/>  <button class="btn btn-info" type='submit'  style={{marginLeft:'250px', width:'180px'}} >Validate</button>
      <h6 className='Err' style={{paddingLeft:'222px', marginTop:'20px', fontSize:'20px' }} >{er.cp}</h6>
      </form>

      <br/>
    </div>   
    </a>
<div style={{ paddingLeft:'1000px'}} >
<button type="button" onClick={(e)=> { 
  { 
    if(ed){sendId=location.state.p.id;console.log("put lo sending is :  "+sendId);axios.put(`http://localhost:8002/blogs/${sendId}`,{fn:det.fn,ln:det.ln,c:det.c,dob:det.dob,phone:det.phone,gen:det.gen, cou:det.cou, email:det.email,password:det.password}).then(res=> {console.log("Edittedddd : "+sendId)});}
    else {sendId=sendId+1;axios.post("http://localhost:8002/blogs",{fn:det.fn,ln:det.ln,c:det.c,dob:det.dob,phone:det.phone,gen:det.gen, cou:det.cou, email:det.email,password:det.password}).then(res=> {console.log("posted : "+det.fn+"sendinf id : "+sendId)}); }  
    history.push
        ({
           pathname: '/login',
           state: { sendId }
       });
        window.location.reload(false);
    console.log(det);console.log("last lo "+sendId)
  }
} 
  } class={isSubmit?'btn btn-success':'btn btn-outline-danger'} style={{width:'200px', height :'40px'}} disabled={!isSubmit} >{isSubmit?'Submit':'Validate to submit'}</button>
 </div>
</div>
  )
}

export default Reg