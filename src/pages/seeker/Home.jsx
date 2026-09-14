// station//
import Select from "react-select";
// import { useTheme } from "../../usetheme";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import OutlinedInput from '@mui/material/OutlinedInput';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//   slotProps: {
//     paper: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 250,
        
//       },
//     },
//   },
// };


// station//
import "../design.css";
import {useState,useEffect} from "react";

import Nav from "./navbar";
import ClickableChips from "./popularareas";
import { SearchRoom } from "./searchfilter";

// const images=[
//     {id:1,src:heroimage}
// ]
const propertytype=[
    {value:"Apartment",label:"Apartment"},
    {value:"One-room",label:"One-room"},
    {value:"Share house",label:"Share house"},
]
function Property(){
    return (
        <div style={{width:"350px",fontSize:"15px"}}>
            <Select
            options={propertytype}
            placeholder="Search property type"
            />
        </div>
    )
}


export default function Homepage(){
        const [prodata,setProdata]=useState([]);
        const [loading,setLoading]=useState(true);
        const [selectedStation,setSelectedStation]=useState("")
        const [search,setSearch]=useState("")
        // const {theme,toggleTheme}=useTheme()
       
        // useEffect(()=>{
        //             async function MajorCity(){
        //                 try{
        //                     const response=await fetch("https://service.api.metro.tokyo.lg.jp//api/t000021d2000000044-77fc31e4b0a866f7aea40c7398c8b7a5-0/json",{
        //                         method:"POST",
        //                         header:{
        //                             "Content-Type":"application/json",
        //                             "Accept":"application/json"
        //                         },
        //                         body:JSON.strigify({})
        //                     });
        //                     if(!response.ok){
        //                         throw new Error(`HTTP ${response.status}`);
        //                     }
                            
        //                     const cityName=await response.json();
        //                     console.log(cityName.JSON.strigify(null))
        //                 }catch(err){
        //                 console.error(err)
        //                 }
        //             }
                
        //             MajorCity()
                
        // },[]);
        useEffect(() => {

    async function Seekerhome() {

        try {

            const res = await fetch("https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/鉄道データ/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=json");

            if (!res.ok) {
                throw new Error("Failed to fetch! Try again.");
            }

            const text=await res.json();
            console.log(text.features[0].attributes)
            setProdata(text.features)
            // setProdata(localStorage.setItem("setData",JSON.stringify(text.features)))
           
            // setProdata(seekerdata);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    Seekerhome();

}, []);

const filterstaton=prodata.filter((item)=>(
    item.attributes.N02_005_en
    ?.toLowerCase()
    .includes(search.toLowerCase())||
    item.attributes.N02_005
    ?.includes(search)
    
    
))
        if(loading)return(<p>loading...</p>);
    return(
        <div className="main_div">
            {/* <button onClick={toggleTheme}>
                {theme==="light"? "🌙dark":" ☀️light"}
            </button> */}
        <Nav/>
        <h2 style={{marginLeft:"10px"
        }}>Find Your Perfect Home <br></br>in Japan</h2>
        
        <div style={{position:"relative",margin:"10px",display:"flex",flexDirection:"row",gap:"5px",
            
            
        }} >
              <input type="text" placeholder="Search nearest stations" 
              value={search}
              
              onChange={(e)=>setSearch(e.target.value)}
              style={{position:"relative",width:"250px",height:"35px",display:"-webkit-inline-flex",borderRadius:"5px"}}
              
            />
            <Property/>
             <button onClick={(e)=>{selectedStation(e.item.attributes.N02_005)}} className="searchBtn">Search</button>
                  
        </div>
        <div style={{marginLeft:"10px"}}>
            {search && filterstaton.length>0 &&(
            <div style={{overflowY:"auto",height:"200px",width:"200px",cursor:"pointer",position:"relative",padding:"0"}}>
                {filterstaton.map((item)=>(
                    
                    <div key={item.attributes.FID} onChange={(e)=>item(e.target.value)} onClick={()=>{setSelectedStation(item.attributes.N02_005);
                        setSearch(item.attributes.N02_005)
                        selectedStation(item.attributes.N02_005)
                        
                    }}>
                        
                        {item.attributes.N02_005}
                        
                        </div>
                        
                ))}
                
              
            </div>
        
    )}
    </div>
    <div style={{marginLeft:"10px",position:"absolute"}}>
        <h3>Popular areas</h3>
    <ClickableChips/>
    </div>
    <div style={{marginTop:"150px"}}>
    <SearchRoom/>
        {/* <select>
            {prodata.map((station,index)=>(
                
                    <option key={index} value={station.name} placeholder="search station by name">
                        {station.name}
                    </option>
                   
                
                
            ))}
        
        </select> */}
            </div>
        
        </div>
    )
}