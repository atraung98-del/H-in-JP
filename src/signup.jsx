import './pages/design.css';
import image from "/ChatGPT Image Jun 30, 2026, 10_48_18 AM.png";
import { User,Building2, } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {useState} from 'react';
import { CheckCircle } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import { useAuth } from './authcontext/AuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



// loginform//
function HelperTextMisaligned() {
    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
     const [SuccessModal,setSuccessModal]=useState(false);
     const [loginLoading,setLoginLoading]=useState(false);
     const [loginError,setLoginError]=useState("")
     const {login}=useAuth();
    //  const [setSelected]=useState(localStorage.getItem("userRole")||"")
    //  const [selected,setSelected]=useState("")
    //  const navigate=useNavigate();
     
    async function Login(e){
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("")

    try{
        const session=await login(
            loginEmail,loginPassword
        );
        console.log("login successful",session);
        
        setTimeout(()=>{
            if(setLoginPassword!==loginPassword && session.user?.profile_type==="Homeowner"){
                // navigate("provider/Provider");
                window.location.href="provider/Provider"
            }else if(setLoginPassword!==loginPassword && session.user?.profile_type==="renter"){
                // 
                window.location.href="/Home"
            }else {
                // navigate("/")
                window.location.href="/"
            }
             setSuccessModal(true);
        },1500)
    }catch(error){
       console.log("LOGIN ERROR OBJECT:", error);
        console.log("LOGIN ERROR MESSAGE:", error.message);
        setLoginError(
            error.message ||
            "Email or Password is incorrect ! Please try agian"
        );
        setTimeout(() => {
            setLoginError("");
        }, 3000);

    }finally{
        setLoginLoading(false);
    }
   

}
  return (
    <div className="login-container">
    <Box sx={{
            width: "100%",
            maxWidth: "420px",

            display: "flex",
            flexDirection: "column",

            alignItems: "center",

            margin: "0 auto"
        }}>
        <h2 className="login-subtitle">Welcome Back</h2>

            <p className="login-subtitle">
                Log in to your ATLandTip account
            </p>

        <form className="login-form form-motion" onSubmit={Login}>

    <TextField
        label="Email"
        type="email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        helperText="Please enter email"
        fullWidth
        required
        size="large"
       sx={{
        "& .MuiOutlinedInput-root": {
            backgroundColor: "transparent",
        },

        "& .MuiInputBase-input": {
            backgroundColor: "transparent",
        },

        "& .MuiInputBase-input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px transparent inset",
            WebkitTextFillColor: "#fff",
        },
    }}
    />

    <TextField
        label="Password"
        type="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        helperText="Please enter your registered password"
        fullWidth
        required
        size="large"
        sx={{
        "& .MuiOutlinedInput-root": {
            backgroundColor: "transparent",
        },

        "& .MuiInputBase-input": {
            backgroundColor: "transparent",
        },

        "& .MuiInputBase-input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px transparent inset",
            WebkitTextFillColor: "#fff",
        },
    }}
    />
    {loginError && (
        <p className="login-error">{loginError}</p>
    )}
    <button className="login-submit-btn" type="submit"

        disabled={loginLoading}
    >
     {loginLoading?"Loggin in":"Log in"}
    </button>

   </form>
     </Box>
      {SuccessModal && (
    <div className="success-overlay">
        <div className="success-modal">

            <div className="success-icon">
                ✓
            </div>

            <h2>Welcome back {User}</h2>

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
//     const {
//     user,
    
//     loading,

// }=useAuth();
// console.log("auth user",user);
// console.log("auth loading",loading)
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
                        profile_type:selected.toLowerCase()
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(data.fields || {general:data.message});

                return;
            }
          
           setTimeout(()=>{
             setSuccessModal(true);
             navigate("/")
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
    // login//
   
    // login//

    return (
    <div className="signup-page">
    <div className="desi">
    
        <div className="background">
        
       <img src={image} alt="background" />
       
        </div>
        {/* image context */}
        <div className="background-content">

        <div className="brand-logo">
            AT<span>LandTip</span>
        </div>

        <h1>
            Find Your Place
            <br />
            to Call Home
        </h1>

        <p>
            Discover comfortable rooms and properties
            across Japan with ATLandTip.
        </p>

        <div className="features">

            <div>
                <span>✓</span>
                Easy property search
            </div>

            <div>
                <span>✓</span>
                Trusted property listings
            </div>

            <div>
                <span>✓</span>
                Simple rental experience
            </div>

        </div>

        <div className="bottom-message">
            Find your next home in Japan.
        </div>

    </div>

        {/* image context */}
        {/* twoopt div */}
        <div className="twoopt">
            
            <div className="twobtn">
            <button className={authmode === "login" ? "signupbtn active" : "signupbtn"} onClick={()=>setAuthmode("login")}>
                Log in
            </button>
            <button className={authmode === "create_account" ? "cabtn active" : "cabtn"} onClick={()=>setAuthmode("create_account")}>
                Create Account
            </button>
            </div>
            {/* option div */}
            
            {/* form-data */}
            {authmode==="create_account" && (
                // option//
                <div className="form-motion">

                    <div>
                <p style={{fontFamily:"sans-serif",paddingTop:"10px",marginLeft:"60px"}}>I'm a...</p>
            </div>
        <div className="option">
            
            <div onClick={()=>{setSelected("renter");console.log("renter")}} className={selected=="renter"?"selected":""} className="renter" >
                                {selected==="renter" && (<CheckCircle className="checkicon" size={24} fill='blue' color="white" />)}

                
                <div className='icon1'>
                <User size={24} />
                </div>
                 <h3>အိမ်ရှာဖွေသူ</h3>
                 <p>I'm looking for a place to live</p>
                
            </div>
            
            <div onClick={()=>{setSelected("Homeowner");console.log("Homeowner")}} className={selected=="Homeowner"?"selected":""} className="provider">
                
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
                    Create Account</button>
            </form>
            </div>
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

            <h2>You reated account as a {selected}</h2>

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
    
    </div>
    );
}