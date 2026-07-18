import "../design.css";
import {Link} from "react-router-dom";
export default function Nav(){
    return(
        <div className="navbar2">
            <div className="navbar1">
                <div className="navbar">
                    <nav>
                        <Link to="/">Home</Link>|{""}
                        <Link to="/Searchfilter">Search filter</Link>
                        <Link to="/Saved">Saved</Link>
                    </nav>
                </div>
                <div className="favmes">
                    <button>Favorites</button>
                    <button>Messages</button>
                    
                </div>
            </div>
            
         </div>
    )
}