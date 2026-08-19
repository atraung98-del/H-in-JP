import express from "express"

// import {con} from "./db.js";
import cors from "cors";

const app=express();
app.use(cors())
app.use(express.json())

// app.post("/owner",async (req,res)=>{
//   try{
//   const {date,title,rent,property,description,floor,layout}=req.body;

// const result=await con.query(
//   `INSERT INTO property_owner(date,title,rent,property,description,floor,layout)
//   VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
//   [date,title,rent,property,description,floor,layout]
// );
// res.json(result.rows[0]);
// }catch(err){
//   console.error(err)
//   res.status(500).json({
//     message:err.message,
//   });
// }
// });
// app.get("/owner,",async(req,res)=>{
//   try{
//       const result=await con.query(
//         "SELECT * FROM owner"
//       );
//       res.json(result.rows);
//   }catch(err){
//     console.error(err.message)
//   }
// });
app.get("/stations",async(req,res)=>{
 try{ const response=await fetch("https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/鉄道データ/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=json");
     
  if(!response.ok){
    throw new Error(`HTTP ${response.status}`);
    // throw new Error(`HTTP ${nextresponse.status}`);
  }

  const data=await response.json();
  
  console.log(data.features[0].attributes);
  
  res.json(data.response.features);
 }catch(err){
  console.error(err);
  res.status(404).json({
    message:err.message
  })
 }
});
app.listen(5000,()=>{
  console.log("http://localhost:5000/stations")
})
