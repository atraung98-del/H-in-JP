import "../design.css"
import { NavLink } from "react-router";
export default function ProviderNav(){
    
    
    return(

        <div>

            <div className="Provdash">
                <nav>
                     
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/">Provider Dashboard</NavLink>{""}
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/AllProperties">All Properties</NavLink>
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/Uploads">Upload</NavLink>
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/Messages">Messages</NavLink>
                     <NavLink className={({isActive})=>isActive?"nav-link":"active-link"}className="prov" to="/provider/Provider/Settings">Settings</NavLink>

                </nav>
            </div>
        </div>
    )
}