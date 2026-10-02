import "../design.css";
import {NavLink} from "react-router-dom";
import { useAuth } from "../../authcontext/AuthContext";


import UserProfileMenu from "./user_profile";


export default function Nav(){

    const {user}=useAuth();
    console.log("current user",user)
    
    
    return(
        <div className="navbar2">
            
            <div className="navbar1">
                <div className="navbar">
                  <nav>
                        <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/Home">Home</NavLink>{""}
                        <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/Searchfilter">Search filter</NavLink>
                        <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/Saved">Saved</NavLink>
                  </nav>
                </div>
                <div className="favmes">
                    <button>Favorites</button>
                    <button>Messages</button>
                    <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/">Be a provider</NavLink>
                    
                    <div style={{marginTop:"15px"}}>
                        <UserProfileMenu/>
                       
                        {/* <UserProfileMenu/> */}
                      

    {/* <span>
        {user?.profile?.full_name || user?.email || "Guest"}
    </span>

    <ChevronDown size={16} /> */}
                        {/* {user && (<span style={{color:"white"}}>
                            {use?.profile?.full_name }
                        </span>)} */}
                    </div>
                    
                    <p style={{display:"block",backgroundColor:"#1f7fe6",width:"90px",height:"30px",textAlign:"center",marginTop:"20px"
                        ,fontSize:"14px",color:"white",borderRadius:"20px"
                    }}>အိမ်ရှာဖွေသူ</p>
                    
                </div>
            </div>
            
         </div>
    )
}
