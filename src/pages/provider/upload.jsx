import { useState } from "react";
import ProviderNav from "./Dashboard"
import "../design.css"
import BackupIcon from '@mui/icons-material/Backup';
export default function Uploads(){
    const [property,setProperty]=useState("");
    const [layout,setLayout]=useState("");
    const [floor,setFloor]=useState("");
    const [description,setDescription]=useState("")
    return(

        <div>
            <div className="navigate">
                <ProviderNav/>
            <div className="Property-form">
            
            <div className="form-group">
                Property Title:
                <input type="text"/>
            </div>
            <div className="form-group">
                Property Type:
                <select value={property}
                onChange={(e)=>setProperty(e.target.value)}>
                    <option value="Select property">Select Property</option>
                    <option value="Apartment">Apartment</option>
                    <option value="One room">One room</option>
                    <option value="Share house">Share House</option>
                </select>
            </div>
            <div className="form-group">
                Rent(Monthly):
                <input type="number"/>
            </div>
            <div className="form-group">
                Deposit:
                <input type="number"/>
            </div>
            <div className="form-group">
                Avaliable From:
                <input type="date"/>
            </div>
            <div className="form-group">
                Floor/Total Floors:
                <select value={floor}
                onChange={(e)=>setFloor(e.target.value)}>
                    <option value="">Select the floor</option>
                    <option value="1">1st floor</option>
                    <option value="2">2nd floor</option>
                    <option value="3">3rd floor</option>
                    <option value="4">4th floor</option>
                    <option value="5">5th floor</option>
                </select>
            </div>
            <div className="form-group">
                Layout:
                <select value={layout}
                onChange={(e)=>setLayout(e.target.value)}>
                    <option value="">Select the layout</option>
                    <option value="1k">1K</option>
                    <option value="2k">2K</option>
                    <option value="3k">3K</option>
                </select>
            </div>
            <div className="form-group full-width">
                 <label>Description</label>

                <textarea className="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={1500}
                    rows={6}
                    placeholder="Describe your property..."
      />
            </div>
           </div>
           <div className="uploadPhoto">
                <div className="imageUpload">
                        <h5>Upload Photos</h5>
                        <div className="imageSession">
                            <BackupIcon style={{fontSize:"50px",fontWeight:"lighter",color:"#e32a71"}}/>
                            <p>Drag & drop photos here</p>
                            <p>or</p>
                            <button className="uploadBtn">Browse Files</button>
                            <p>You can upload up tp 10 images(JPEG,PNG)</p>
                        </div>
                </div>
           </div>
            </div>    
        
    </div>
        
    )
}