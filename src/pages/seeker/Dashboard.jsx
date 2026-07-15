import "../design.css";
import { useState } from "react";
import Searchfilter from "./searchfilter";
import Homepage from "./Home";
export default function Tenant(){
const [page,setpage]=useState("Home");

    return(
            // maindivsession//
        <div className="navbar2">
            <div className="navbar1">
                <div className="navbar">
                    <button onClick={()=>setpage("Home")}>Home</button>
                    <button onClick={()=>setpage("Search")} className="sbtn">Search</button>
                    <button onClick={()=>setpage("Saved")}>Saved</button>
                    <button onClick={()=>setpage("Loan Calculator")}>Loan Calculator</button>
                    <button onClick={()=>setpage("About us")}>About us</button>
                </div>
                <div className="favmes">
                    <button>Favorites</button>
                    <button>Messages</button>
                    
                </div>
            </div>
            <div className="content">
                {page== "Home" && <Homepage/>}
                {page== "Search" && <Searchfilter/>}
                {page== "Saved" && <h1>Saved</h1>}
                {page== "Loan Calculator" && <h1>Loan Calculator</h1>}
                {page== "About us" && <h1>About us</h1>}
            </div>
            
         </div>
        
    )
}