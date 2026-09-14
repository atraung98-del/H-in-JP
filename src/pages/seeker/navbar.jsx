import "../design.css";
import {NavLink} from "react-router-dom";
import { useAuth } from "../../authcontext/AuthContext";





export default function Nav(){
    const {user,logout}=useAuth();
    async function handleLogout(){
    
    try{
            await logout();
            window.location.href="/";
    }catch(error){
            console.error("logout failed"),
            error;
    }
}
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
                    <div>
                        {user && (<span style={{color:"white"}}>
                            {user.profile?.full_name}
                        </span>)}
                    </div>
                    <button type="button" onClick={handleLogout} style={{backgroundColor:"rgb(219, 6, 73)",width:"100px",height:"30px",marginTop:"20px",borderRadius:"2px",border:"none"}}>Log out</button>
                </div>
            </div>
            
         </div>
    )
}
