import '../design.css';
import image from "/ChatGPT Image Jun 30, 2026, 10_48_18 AM.png";
import { User,Building2, } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {useState} from 'react';
import { CheckCircle } from 'lucide-react';
export default function Signup(){
    const [selected,setselected]=useState(localStorage.getItem ("userRole")||[]);
    console.log(localStorage.getItem("userRole"))
    return (
    
    <div className="desi">
        <div className="background">
        
       <img src={image} alt="background" />
       
        </div>
        {/* twoopt div */}
        <div className="twoopt">
            <div className="twobtn">
            <button className="signupbtn">
                Sign up
            </button>
            <button className="cabtn">
                Create Account
            </button>
            </div>
            {/* option div */}
            <div>
                <p style={{fontFamily:"sans-serif",paddingTop:"10px",marginLeft:"60px"}}>I'm a...</p>
            </div>
        <div className="option">
            
            <div className={`seeker ${selected==="tenant"?"active":""}`}
            onClick={()=>{setselected("tenant");localStorage.setItem("userRole","tenant")}}>
                <div className={`checkicon ${selected==="tenant"? "checked":""}`}><CheckCircle size={24}/></div>
                <div className='icon1'>
                <User size={24} strokeWidth={2} />
                </div>
                 <h3>အိမ်ရှာဖွေသူ</h3>
                 <p>I'm looking for a place to live</p>
                
            </div>
            
            <div className={`provider ${selected==="owner"? "active": ""}`}
            onClick={()=>{setselected("owner");localStorage.setItem("userRole","owner")}}>
                
                {/* {selected==="owner" && (<CheckCircle className="checkicon" size={24} fill='blue' color="white" />)} */}
                <div className={`checkicon ${selected==="owner"? "checked":""}`}><CheckCircle size={24}/></div>
                <div className='icon2'>
                <Building2 size={24} strokeWidth={2} />
                </div>
                <h3>အိမ်ခန်း သို့မဟုတ် အိမ်ပြပေးသူ</h3>
                <p>I want to list and rent out my property</p>
            </div>
               
        </div> 
        {/* option div */}

         {/* divider div */}
            <div className="divider">
                <div className="line"></div>
                 <span>or continue with</span>
                 <div className="line"></div>
            </div>
            {/* divider div */}
        {/* google and facebook icon div */}
            <div className="otheropt">
                <div>
                    <button className="gbtn1">
                        <GoogleIcon style={{width:"22px",height:'22px',}}/>
                        <span style={{marginTop:"3px"}}>Continus with google</span>
                    </button>
                </div>
                <div>
                    <button className="gbtn2">
                        <FacebookIcon style={{width:"22px",height:'22px'}}/>
                        <span style={{marginTop:"3px"}}>Continus with facebook</span>
                    </button>
                </div>
            </div>
        {/* google and facebook icon div */}

            <div className="divider">
                <div className="line"></div>
                 <span>or</span>
                 <div className="line"></div>
            </div>
            {/* form-data */}
             <div className="myform">
            <form className="formdata">
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button className="signbtn">Sign up/in</button>
            </form>
            </div>
            {/* form-data */}
        </div>
       {/* twoopt div */}

       
            
    </div>
    
    
    );
}