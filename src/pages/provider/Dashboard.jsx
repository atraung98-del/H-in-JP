import "../design.css"
import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
export default function ProviderNav(){
    const { logout, user } = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch {
            window.alert("Logout failed. Check the API connection and try again.");
        }
    }
    
    return(

        <div>

            <div className="Provdash">
                <nav>
                     
                     <p className="prov">{user?.email}</p>
                     <NavLink className={({isActive})=>isActive?"prov prov--active":"prov"} to="/provider">Provider Dashboard</NavLink>
                     <NavLink className={({isActive})=>isActive?"prov prov--active":"prov"} to="/provider/properties">All Properties</NavLink>
                     <NavLink className={({isActive})=>isActive?"prov prov--active":"prov"} to="/provider/uploads">Upload</NavLink>
                     <NavLink className={({isActive})=>isActive?"prov prov--active":"prov"} to="/provider/messages">Messages</NavLink>
                     <NavLink className={({isActive})=>isActive?"prov prov--active":"prov"} to="/provider/settings">Settings</NavLink>
                     <button type="button" className="prov provider-logout" onClick={handleLogout}>Log out</button>

                </nav>
            </div>
        </div>
    )
}
