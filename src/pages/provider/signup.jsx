import '../design.css';
import image from "/ChatGPT Image Jun 30, 2026, 10_48_18 AM.png";
import { User,Building2, } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {useState} from 'react';
import { CheckCircle } from 'lucide-react';



export default function Signup(){
   
    // usersignup//
       

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname,setFullName]=useState("");
    const [selected,setSelected]=useState(localStorage.getItem("userRole")||"");
    const [error, setError] = useState({});


    async function Login(e) {

        e.preventDefault();

        setError({});
        

        try {

            const response = await fetch(
                "http://localhost:8080/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password,
                        full_name:fullname,
                        profile_type:selected
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(data.fields || {general:data.message});

                return;
            }


            console.log(
                "Login successful",
                data
            );

        } catch (err) {

            console.error(
                "Backend connection failed:",
                err
            );

        }
    }
    // usersignup//
    
    
    
    
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
            
            <div onClick={()=>{setSelected("renter");console.log("renter")}} className={selected=="renter"?"selected":""} className="seeker">
                                {selected==="renter" && (<CheckCircle className="checkicon" size={24} fill='blue' color="white" />)}

                
                <div className='icon1'>
                <User size={24} />
                </div>
                 <h3>အိမ်ရှာဖွေသူ</h3>
                 <p>I'm looking for a place to live</p>
                
            </div>
            
            <div onClick={()=>{setSelected("Home_provider");console.log("Home_provider")}} className={selected=="Home_provider"?"selected":""} className="provider">
                
                {selected==="Home_provider" && (<CheckCircle className="checkicon" size={24} fill='blue' color="white" />)}
              
                <div className='icon2'>
                <Building2 size={24} />
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
            <form className="formdata" onSubmit={Login}>
                <input type="text" placeholder='Full Name' value={fullname} onChange={(e)=>setFullName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                {error.email &&(
                    <p>{error.email}</p>
                )}
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {error.password &&(
                    <p>{error.password}</p>
                )}
                <button className="signbtn" type="submit">
                    
                    Sign up/in</button>
            </form>
            </div>
            {/* form-data */}
        </div>
     
       
            
    </div>
    
    
    );
}