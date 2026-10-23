import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import LeafletMap from "../map/leaflet";
import "../design.css"
import Nav from "./navbar";
import {useState,useEffect} from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
// image resolve//
const API_ORIGIN = "http://localhost:8080";

function getImageUrl(url) {
    if (!url) {
        return null;
    }

    // If backend already gives a complete URL
    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {
        return url;
    }

    // If backend gives /uploads/...
    if (url.startsWith("/")) {
        return `${API_ORIGIN}${url}`;
    }

    // If backend gives uploads/...
    return `${API_ORIGIN}/${url}`;
}
// image resolve//
const station=[
  { value: "tokyo", label: "🚉 Tokyo Station" },
  { value: "shinjuku", label: "🚉 Shinjuku Station" },
  { value: "shibuya", label: "🚉 Shibuya Station" },
  { value: "ikebukuro", label: "🚉 Ikebukuro Station" },
  { value: "ueno", label: "🚉 Ueno Station" },
  { value: "akihabara", label: "🚉 Akihabara Station" },
  { value: "shinagawa", label: "🚉 Shinagawa Station" },
  { value: "yurakucho", label: "🚉 Yurakucho Station" },
  { value: "ebisu", label: "🚉 Ebisu Station" },
  { value: "meguro", label: "🚉 Meguro Station" },
  { value: "harajuku", label: "🚉 Harajuku Station" },
  { value: "yoyogi", label: "🚉 Yoyogi Station" },
  { value: "kanda", label: "🚉 Kanda Station" },
  { value: "nippori", label: "🚉 Nippori Station" },
  { value: "sugamo", label: "🚉 Sugamo Station" },
  { value: "komagome", label: "🚉 Komagome Station" },
  { value: "tamachi", label: "🚉 Tamachi Station" },
  { value: "hamamatsucho", label: "🚉 Hamamatsucho Station" },
  { value: "ochanomizu", label: "🚉 Ochanomizu Station" },
  { value: "kinshicho", label: "🚉 Kinshicho Station" }
];

// search room//
export function SearchRoom() {
    const [RoomData, setRoomdata] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState("");
    const [SelectHome,setSelectHome]=useState(null);
    useEffect(() => {
        async function roomData() {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/rooms`
                );

                const result = await response.json();

                
                console.log("Full response:", result);
               
                console.log("result.data:", result.data);
                console.log(
                    "Is result.data Array?",
                    Array.isArray(result.data)
                );
               

                if (!response.ok) {
                    throw new Error(
                        `Server returned ${response.status}`
                    );
                }

                // Backend returns: { data: [...] }
                if (Array.isArray(result.data)) {
                    setRoomdata(result.data);
                }

                // Backend returns: [...]
                else if (Array.isArray(result)) {
                    setRoomdata(result);
                }

                else {
                    console.error(
                        "Room API did not return an array:",
                        result
                    );

                    setRoomdata([]);
                    setError("Room data format is incorrect.");
                }

            } catch (err) {
                console.error("Room fetch error:", err);
                setError("Cannot load rooms.");
            } finally {
                setLoad(false);
            }
        }

        roomData();
    }, []);

    if (load) {
        return <p>Loading rooms...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
       <div className="room-list">

    <div className="room-list-header">
        <h3>
            Avaliable rooms
        </h3>

        <span>
            {RoomData.length} rooms
        </span>
    </div>


    {RoomData.length === 0 ? (

        <div className="no-rooms">
            <p className="np-rooms">hi</p>
        </div>

    ) : (

        <div className="room-grid">
            
            {RoomData.map((room) => (

                <div
                    className="room-card"
                    key={room.id}
                    onClick={(e) => {
    e.stopPropagation();
    setSelectHome(room);
  }}
                    
                >

                    {/* IMAGE */}
                    
                    <div className="room-image">

                        {room.original_filename ? (

                            <img
    src={getImageUrl(room.cover_photo?.thumb_url)}
    alt={room.title}
    // src={room.room.cover_photo.thumb_url}
    onError={(e) => {
        console.error(
            "IMAGE FAILED:",
            e.currentTarget.src
        );
    }}
/>

                        ) : (
                            
                            <div className="no-image">
                               
                                
                            </div>
                            
                        )}
                         <p className="no-image1">
                                    Loading image
                                </p>
                        <button
                            type="button"
                            className="favorite-btn"
                        >
                            ♡
                        </button>

                    </div>


                    {/* CONTENT */}
                    <div className="room-content">

                        <h3 className="room-title">
                            {room.title}
                        </h3>


                        <p className="room-location">
                            <Stack direction="row" spacing={0} >
      <Chip icon={<LocationOnIcon style={{fontSize:"20px",color:"#e91e63"}}/>} variant='outline'label= {room.city || "Japan"} style={{border:"1px solid white",color:"black"}}/>
      
    
    </Stack> 
                        </p>


                        <div className="room-price">

                            ¥{Number(
                                room.price_amount || 0
                            ).toLocaleString()}

                            <span>
                                / {room.price_period || "month"}
                            </span>

                        </div>


                        <div className="room-info">

                            <span>
                                {room.room_type || "Room"}
                            </span>

                            <span>
                                {room.bed_count || 1} bed
                            </span>

                            <span>
                                {room.bathroom_type || "Bathroom"}
                            </span>
                            <span>
                                {room.deposit_amount||"Deposit amount"}
                            </span>
                            
                        </div>


                        {room.description && (
                            <p className="room-description">
                                {room.description}
                            </p>
                        )}


                        <button
                            type="button"
                            className="view-room-btn"
                            onClick={(e)=>{
                                e.stopPropagation();
                                setSelectHome(room);}}
                        >
                            View Room
                            <span>→</span>
                        </button>

                    </div>

                </div>

            ))}

        </div>

    )}
    {/* I code this for room data details viewing code. */}
    {SelectHome && (
        <div className="home-detail">
          <button onClick={() => setSelectHome(null)}>
            ← Back to homes
          </button>

          <h2>{SelectHome.title||"Room Details"}</h2>
          <img
      src={getImageUrl(SelectHome.cover_photo?.thumb_url)}
      alt={SelectHome.title || "Room"}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "300px",
        objectFit: "cover",
        borderRadius: "12px",
      }}
    />

          <h3>
      ¥{Number(
        SelectHome.price_amount || 0
      ).toLocaleString()} / {SelectHome.price_period || "month"}
    </h3>

    <p>
      <strong>Address:</strong>{" "}
      {SelectHome.address || SelectHome.city || "Not provided"}
    </p>

    <p>
      <strong>City:</strong> {SelectHome.city || "Not provided"}
    </p>

    <p>
      <strong>Room type:</strong> {SelectHome.room_type || "Not provided"}
    </p>

    <p>
      <strong>Bedrooms:</strong> {SelectHome.bed_count ?? "Not provided"}
    </p>

    <p>
      <strong>Bathroom:</strong> {SelectHome.bathroom_type || "Not provided"}
    </p>

    <p>
      <strong>Deposit:</strong> ¥{Number(
        SelectHome.deposit_amount || 0
      ).toLocaleString()}
    </p>

    <p>
      <strong>Description:</strong>{" "}
      {SelectHome.description || "No description available."}
    </p>
  </div>
)}
 {/* I code this for room data details viewing code. */}
</div>
    );
}
// ///
function Selectstation(){
    return(
        <div style={{width:"200px",fontSize:"15px"}}>
            <Select 
            options={station}
            placeholder="Search station"
            />
        </div>
    )
}
// property//
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

// property
// radius//
const radius=[
    {value:1,label:"1km"},
    {value:2,label:"2km"},
    {value:3,label:"3km"},
]
function Radius(){
    return(
        <div style={{width:"200px",fontSize:"15px"}}>
            <Select 
            options={radius}
            placeholder="Select radius"
            />
        </div>
    )
}
// radius//
export default function Searchfilter(){
  return(
    
    <div className="side">
        <Nav/>
        <div className="redesign">
    <div className="options">
        
                <Selectstation/>
                <Property/>
                <Radius/>
                <button type="submit" className="searchbtn"><SearchIcon style={{fontSize:"24px"}}/><span style={{fontSize:"17px"}}>Search</span></button>
                <div className="savesearch"><BookmarkBorderIcon/><span>Save Search</span></div>
            </div>
            {/* sidebar */}
            <div className="sideandmap">
            <div className="sidebar">
                <div className="type">
                    <h4>Search by</h4>
                    <form className="selecttype">
                        <input type="radio"/><span>Location</span><br></br>
                        <input type="radio"/><span>Station</span>
                    </form>
                </div>
                <div className="type">
                    <h4>Station</h4>
                    <Selectstation/>
                </div>
                <div className="propertytype">
                    <div className="ptype">
                    <p>Property Type</p>
                    <a href="#" style={{fontSize:"15px"}}>See All</a>
                    </div>
                        <form>
                            <input type="checkbox"/><span>Apartment</span><br></br>
                            <input type="checkbox"/><span>One-room</span><br></br>
                            <input type="checkbox"/>Share house
                        </form>
                        
                </div>
                 
               </div>
                <SearchRoom/>
              
            
            </div>
            </div>
            {/* <LeafletMap/> */}
        </div>    
  )
}