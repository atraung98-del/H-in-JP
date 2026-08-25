import './pages/design.css';
import image from "/ChatGPT Image Jun 30, 2026, 10_48_18 AM.png";
import { User,Building2, NotebookPen, } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {useState} from 'react';
import { CheckCircle } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


// loginform//
function HelperTextMisaligned() {
    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
     const [SuccessModal,setSuccessModal]=useState(false)
     const navigate=useNavigate();
    async function Login(e){
    e.preventDefault();
    const response=await fetch("http://localhost:8080/api/auth/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                email:loginEmail,
                password:loginPassword,
            
            })
            
        }
    );
    const data=await response.json([]);
    console.log("login success",data)
    if(!response.ok){
        alert(
            data.error?.message|| "Email or Password is incorrect"
        );
        return;
    }
    setSuccessModal(true);
    setTimeout(()=>{

         if(loginPassword){
        navigate("/provider/Provider")
    }else if(loginPassword===setLoginPassword){
        alert("Email or Password do not match! Please try again")
        navigate("/")
    }        

    },3500)
    // if(loginPassword){
    //     navigate("/Home")
    // }else if(loginPassword===setLoginPassword){
    //     alert("Email or Password do not match! Please try again")
    //     navigate("/")
    // }
}
  return (
    <div>
    <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
        <form className="login-form" onSubmit={Login}>

    <TextField
        label="Email"
        type="email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        helperText="Please enter email"
        fullWidth
        required
    />

    <TextField
        label="Password"
        type="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        helperText="Please enter your registered password"
        fullWidth
        required
    />

    <button className="login-submit-btn" type="submit">
        Log in
    </button>

</form>
    </Box>
     {SuccessModal && (
    <div className="success-overlay">
        <div className="success-modal">

            <div className="success-icon">
                ✓
            </div>

            <h2>Log in successfully</h2>

            <p>
                 Welcome to{" "}
                <span style={{ fontWeight: "700" }}>
                <span style={{ color: "#e53935" }}>AT</span>
                <span style={{ color: "#1565c0" }}>LandTip</span>
                </span>{" "}
                        🎉
            </p>

            <p className="success-small">
                Taking you to your dashboard...please wait for 3s...
            </p>

        </div>
    </div>
)}
    </div>
  );
  
}

// loginform//
export default function Signup(){
   
    // usersignup//
       

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname,setFullName]=useState("");
    const [selected,setSelected]=useState(localStorage.getItem("userRole")|| "");
    const [error, setError] = useState({});
    const [createpassword,setCreatepassword]=useState('');
    const [authmode,setAuthmode]=useState("create_account");
    const [successModal,setSuccessModal]=useState(false)
    const navigate=useNavigate();
    
    async function Register(e) {

        e.preventDefault();

       if(createpassword!==password){
        setError({
            createpassword:"Password do not match"
        })
       }
        

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        id:Date.now(),
                        email: email,
                        createpassword:createpassword,
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
           setSuccessModal(true);
           setTimeout(()=>{

             if(selected==="Homeowner"){
                navigate("/provider/Provider");
            }else if(selected==="renter"){
                navigate("/Home");
            }
             if(createpassword!==password){
                alert("password does not match! please try again")
              return;
            }
            console.log(
                "Login successful",
                data
            );

           },3000)
            // if(selected==="Homeowner"){
            //     navigate("/provider/Provider");
            // }else if(selected==="renter"){
            //     navigate("/Home");
            // }
            //  if(createpassword!==password){
            //     alert("password does not match! please try again")
            //   return;
            // }
            // console.log(
            //     "Login successful",
            //     data
            // );

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
            <button className="signupbtn" onClick={()=>setAuthmode("login")}>
                Log in
            </button>
            <button className="cabtn" onClick={()=>setAuthmode("create_account")}>
                Create Account
            </button>
            </div>
            {/* option div */}
            <div>
                <p style={{fontFamily:"sans-serif",paddingTop:"10px",marginLeft:"60px"}}>I'm a...</p>
            </div>
        <div className="option">
            
            <div onClick={()=>{setSelected("renter");console.log("renter")}} className={selected=="renter"?"selected":""} >
                                {selected==="renter" && (<CheckCircle className="checkicon" size={24} fill='blue' color="white" />)}

                
                <div className='icon1'>
                <User size={24} />
                </div>
                 <h3>အိမ်ရှာဖွေသူ</h3>
                 <p>I'm looking for a place to live</p>
                
            </div>
            
            <div onClick={()=>{setSelected("Homeowner");console.log("Homeowner")}} className={selected=="Homeowner"?"selected":""} >
                
                {selected==="Homeowner" && (<CheckCircle className="checkicon" size={24} fill='blue' color="white" />)}
              
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
            {authmode==="create_account" && (
                <div className="myform">
            <form className="formdata" onSubmit={Register}>
                <input type="text" placeholder='Full Name' value={fullname} onChange={(e)=>setFullName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                {error.email &&(
                    <p>{error.email}</p>
                )}
                <input type="password" placeholder="Create password" value={createpassword} onChange={(e)=>setCreatepassword(e.target.value)}/>
                {error.createpassword&&(
                    <p>{error.createpassword}</p>
                )}
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {error.password &&(
                    <p>{error.password}</p>
                )}
                <button className="signbtn" type="submit">
                    {/* {alert(`Congradulation! You create user account the account is  ${selected},${fullname}`)} */}
                    Sign up/in</button>
            </form>
            </div>
            )}
            {/* form-data */}
            {authmode==="login" && (
                <div>
                   <HelperTextMisaligned/>
                  
                </div>
            )}
            {successModal && (
    <div className="success-overlay">
        <div className="success-modal">

            <div className="success-icon">
                ✓
            </div>

            <h2>Account Created!</h2>

            <p>
                Welcome to Home-in-Japan 🎉
            </p>

            <p className="success-small">
                Taking you to your dashboard...
            </p>

        </div>
    </div>
)}
        </div>
     
       
            
    </div>
    
    
    );
}