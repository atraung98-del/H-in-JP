
import db from "./db.js"

import cors from "cors";

const app=express();
app.use(cors())

app.use(express.json())

app.post("/properties",(req,res)=>{
  const {date,title,rent,property,description,floor,layout}=req.body;


const sql=`
INSERT INTO properties 
(date, title, rent, property, description, floor, layout)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
db.run(
  sql,[
    date,title,rent,property,description,floor,layout],
    function (err){
      if(err){
        console.error(err);
         return res.status(500).json({ message: err.message });
      }
      res.json({
        success: true,
        id: this.ID,
      })
    }
)
});
app.get("/properties",(req,res)=>{
  const sql="SELECT * FROM properties";

  db.all(sql,[],(err,rows)=>{
    if(err){
      console.error(err.message)
      return res.status(500).json({
        message:err.message,
      })
    }res.json(rows)
  })
})
app.listen(5000,()=>{
  console.log("server is running on port 5000")
})

