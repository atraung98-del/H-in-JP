import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LeafletMap from "../map/leaflet";
import "../design.css"
import Nav from "./navbar";
import { useEffect, useState } from "react";
import { searchRooms } from "../../lib/api";
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

function Selectstation({ value, onChange }){
    return(
        <div style={{width:"200px",fontSize:"15px"}}>
            <Select 
            options={station}
            placeholder="Search station"
            value={value}
            onChange={onChange}
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
function Property({ value, onChange }){
    return (
        <div style={{width:"350px",fontSize:"15px"}}>
            <Select
            options={propertytype}
            placeholder="Search property type"
            value={value}
            onChange={onChange}
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
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRooms = async () => {
    setLoading(true);
    setError("");

    try {
      // The public Go endpoint does not support station/property-type filters yet.
      // It still provides live listing data for this screen.
      const response = await searchRooms();
      setRooms(response.data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    async function loadInitialRooms() {
      try {
        const response = await searchRooms();
        if (active) {
          setRooms(response.data);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadInitialRooms();
    return () => {
      active = false;
    };
  }, []);

  return(
    
    <div className="side">
        <Nav/>
    <div className="options">
        
                <Selectstation value={selectedStation} onChange={setSelectedStation}/>
                <Property value={selectedPropertyType} onChange={setSelectedPropertyType}/>
                <Radius/>
                <button type="button" onClick={loadRooms} className="searchbtn"><SearchIcon style={{fontSize:"24px"}}/><span style={{fontSize:"17px"}}>Search</span></button>
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
                    <Selectstation value={selectedStation} onChange={setSelectedStation}/>
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
               <LeafletMap/>
               
            </div>
            <section className="room-results" aria-live="polite">
              <h2>Available rooms</h2>
              {loading && <p>Loading listings from the API…</p>}
              {error && <p role="alert">Could not load listings: {error}</p>}
              {!loading && !error && rooms.length === 0 && <p>No active rooms are available yet.</p>}
              {rooms.map((room) => (
                <article key={room.id}>
                  <h3>{room.title}</h3>
                  <p>{room.city}, {room.township}</p>
                  <p>{room.price_currency} {room.price_amount} / {room.price_period}</p>
                </article>
              ))}
            </section>
             
        </div>    
  )
}
