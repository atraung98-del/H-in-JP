import "../design.css";
import {NavLink} from "react-router-dom";
export default function Nav(){
    return(
        <div className="navbar2">
            <div className="navbar1">
                <div className="navbar">
                  <nav>
                        <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/">Home</NavLink>{""}
                        <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/Searchfilter">Search filter</NavLink>
                        <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/Saved">Saved</NavLink>
                  </nav>
                </div>
                <div className="favmes">
                    <button>Favorites</button>
                    <button>Messages</button>
                    <NavLink className={({isActive})=>isActive?"nav-link":"active-link"} to="/provider/Signup">Be a provider</NavLink>
                </div>
            </div>
            
         </div>
    )
}