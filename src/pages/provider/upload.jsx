import { useState,} from "react";
import ProviderNav from "./Dashboard"
import "../design.css"
// import BackupIcon from '@mui/icons-material/Backup';
import axios from "axios";
import { Images } from "lucide-react";
function Upload(){
    const [images,setImages]=useState([]);
    // const filesInputRef=useRef(null);
    // const handleBrowseClick=()=>{
    //     filesInputRef.current.click();
    // }
    const handleChangee=(e)=>{
    
        const files=(Array.from(e.target.files));
        setImages(prev => [
            ...prev,
            ...files
        ]);
        if(files.length>10){
            alert("Your uploaded image are maximun 10 images! Please try again")
            return;
        }
     
    }
    function DeletePhoto(index){
        setImages(prev=>
            prev.filter((_,i)=>i!==index)
        )
    }
    return(
        <div>

      {/* <button type="button" onClick={handleChangee} className="uploadBtn">
        Browse Files
      </button> */}

      <input
        type="file"
        // ref={filesInputRef}
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleChangee}
        // style={{ display: "none" }}
      />
      
      <div style={{display:"flex",gap:"4px",flexWrap:"wrap",}} className="photo-grid">
      {images.map((img,index)=>(
       <div key={index} className="photo-item">
         <img
        key={index} 
        src={URL.createObjectURL(img)}
        alt={`Preview ${index+1}`}
        width="100px"
        height="90px"
        objectfit="cover"
        />
        <button type="button" onClick={()=>DeletePhoto(index)}>×</button>
        </div>
      ))}
      </div>

    </div>
  );
}
// post...//


// post../
export default function Uploads(){
   const [formData,setFormData]=useState({
    property_id:"",
    date:"",
    title:"",
    rent:"",
    property:"",
    description:"",
    floor:"",
    layout:"",
    bet_count:"",
    bathroom_type:"",
    furnished:"",
    available_from:"",
    gender_preference:"",
    status:"",

   });
   const handleChange= (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
   }
    const handlesubmit= async (e)=>{
        e.preventDefault();
        try{
            const response= await axios.post("http://localhost:8080/rooms",
                {
        title: formData.title,
        property_type: formData.property,
        price: Number(formData.rent),
        deposit: Number(formData.deposit),
        available_from: formData.date,
        floor: Number(formData.floor),
        layout: formData.layout,
        description: formData.description,
        bed_count:formData.bedcount,
      },
      {
        withCredentials: true
      }
                
            )
        alert("Property saved successfully!");
        console.log(response.data);
        const room=response.data.data||response.data;
        const roomId=room.id;
        console.log(roomId)
        

//         console.log(JSON.stringify([{date,title,rent,property,description}]))
// ;    
//         alert(`you add ${date},${title},${rent},${property},${description}`)
    }catch (error){
        console.error(error.message);
        
    }
}
    return(
        
        <div>
            <div className="navigate">
                <ProviderNav/>
               
            <div className="Property-form">
            
            <div className="form-group">
                Property Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
            </div>
            <div className="form-group">
                Property Type:
                <select name="property" value={formData.property}
                onChange={handleChange}>
                    <option value="Select property">Select Property</option>
                    <option value="Apartment">Apartment</option>
                    <option value="One room">One room</option>
                    <option value="Share house">Share House</option>
                </select>
            </div>
            <div className="form-group">
                Rent(Monthly):
                <input type="text" name="rent" value={formData.rent} required onChange={handleChange} />
            </div>
            <div className="form-group">
                Deposit:
                <input type="number"/>
            </div>
            <div className="form-group">
                Avaliable From:
                <input type="date" name="date" value={formData.date} onChange={handleChange} required/>
            </div>
            <div className="form-group">
                Floor/Total Floors:
                <select name="floor" value={formData.floor}
                onChange={handleChange}>
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
                <select name="layout" value={formData.layout}
                onChange={handleChange}>
                    <option value="">Select the layout</option>
                    <option value="1k">1K</option>
                    <option value="2k">2K</option>
                    <option value="3k">3K</option>
                </select>
            </div>
            <div className="form-group" >
                Bedcount:
                <input type="number" value={formData.bedcount}/>
            </div>
            <div className="form-group full-width">
                 <label>Description</label>

                <textarea className="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={1500}
                    rows={6}
                    placeholder="Describe your property..."
                    required
      />
            </div>
            <div className="submit">
                <button type="submit" className="cancle">Cancle</button>
                <button type="submit" className="submit1" onClick={handlesubmit}>Post</button>
            </div>
           </div>
           <div>
            <Upload
            />
           </div>
           {/* <div className="uploadPhoto">
                <div className="imageUpload">
                        <h5>Upload Photos</h5>
                        <div className="imageSession">
                            <BackupIcon style={{fontSize:"50px",fontWeight:"lighter",color:"#e32a71"}}/>
                            <p>Drag & drop photos here</p>
                            <p>or</p>
                            
                            
                            <button className="uploadBtn" onClick={handleChange}>Browse Files</button>
                            <p>You can upload up tp 10 images(JPEG,PNG)</p>
                        </div>
                        
                </div>
                <div>
                    <p>Images</p>
                    <Upload/>
                    
                </div>
           </div> */}
           
            </div>    

    
 </div>       
    )
}

