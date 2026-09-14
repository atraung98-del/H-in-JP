import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import LeafletMap from "../map/leaflet";
import "../design.css"
import Nav from "./navbar";
import {useState,useEffect} from "react";
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

    useEffect(() => {
        async function roomData() {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/rooms"
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
        <div className="room-list" style={{overflowY:"scroll",height:"400px"}}>

            <h3>
                Available Rooms ({RoomData.length})
            </h3>

            {RoomData.length === 0 ? (
                <p>No rooms available.</p>
            ) : (

                RoomData.map((room) => (
                    <div
                        className="room-card"
                       
                        key={room.id}
                    >
                        <div  >
                        <h3 style={{color:"white"}}>{room.title}</h3>

                        <p style={{color:"red"}}>
                            {room.status}
                            ¥{room.price_amount}
                            {room.description}
                            {room.deposit_amount}
                            {room.avaliable_from}
                        </p>
                        <img src=
                        {`http://localhost:8080${room.cover_photo?.thumb_url}`}/>
                        
                        </div>
                    </div>
                ))

            )}

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
            {/* <LeafletMap/> */}
        </div>    
  )
}