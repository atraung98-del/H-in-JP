import "../design.css";
import {NavLink} from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
export default function Nav(){
    const { initializing, isAuthenticated, logout, user } = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch {
            window.alert("Logout failed. Check the API connection and try again.");
        }
    }

    return(
        <div className="navbar2">
            <div className="navbar1">
                <div className="navbar">
                  <nav>
                        <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/">Home</NavLink>{""}
                        <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/searchfilter">Search filter</NavLink>
                        {user?.profile_type === "renter" && <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/saved">Saved</NavLink>}
                  </nav>
                </div>
                <div className="favmes">
                    {user?.profile_type === "homeowner" && <NavLink className="active-link" to="/provider">Provider dashboard</NavLink>}
                    {!initializing && !isAuthenticated && <NavLink className="active-link" to="/auth">Log in / Register</NavLink>}
                    {isAuthenticated && <button type="button" onClick={handleLogout}>Log out</button>}
                </div>
            </div>
            
         </div>
    )
}
