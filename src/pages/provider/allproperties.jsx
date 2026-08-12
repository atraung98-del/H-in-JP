import ProviderNav from "./Dashboard";
import {useState,useEffect} from "react";


import "../design.css"

export default function AllProperties(){
    const [property,setProperty]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        async function GetData(){
            try{
                 const res=await fetch("http://localhost:5000/owner");
                 if(!res.ok){
                    throw new Error("Failed to fetch data");
                 }
                 const data=await res.json();
                 setProperty(data);
            }catch(err){
                    console.error(err.message)
            }finally{
                setLoading(false);
            }
        }
        GetData()
    },[]);
    if(loading)return (<div>
        <p>Loading...</p>
    </div>);
    
    return(

        <div>
            <div className="navigate">
                            <ProviderNav/>
                            <div>
                        <h1>All Properties</h1>
                        
                       <div >
                            {property.map((item)=>(
                                <div key={item.id}>
                                
                                   <p>{item.date}</p>
                                   <p>{item.title}</p>
                                    <p>{item.rent}</p>
                                   <p>{item.description}</p>
                                    <p>{item.floor}</p>
                                   <p>{item.layout}</p>
                                </div>
                            ))}
                       </div>
             </div>
                        </div>
        </div>
    )
}