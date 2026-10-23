import "../design.css"
import { NavLink } from "react-router";
import { useAuth } from "../../authcontext/AuthContext";
import { useNavigate } from "react-router";
import LogoutIcon from '@mui/icons-material/Logout';
export default function ProviderNav(){
    const {logout}=useAuth();
    const navigate=useNavigate();
    async function handleLogout(){
    
    try{
            await logout();
            // window.location.href="/";
            alert("Are you sure to logout")
            navigate("/")
    }catch(error){
            console.error("logout failed"),
            error;
    }
}
    return(

        <div>

            <div className="Provdash">
                <nav>
                     
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/">Provider Dashboard</NavLink>{""}
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/AllProperties">All Properties</NavLink>
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/Uploads">Upload</NavLink>
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/Messages">Messages</NavLink>
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/Settings">Settings</NavLink>
                     <button type="button" className="Logout_btn" onClick={handleLogout}><LogoutIcon/>Log out</button>

                </nav>
            </div>
        </div>
    )
}