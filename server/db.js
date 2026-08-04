import {Client} from "pg"
const con=new Client({
    host:"localhost",
    user:"postgres",
    password:"aung123",
    port:5432,
    database:"HinJP"
});



async function getData(){
    try{
       await con.connect();
       console.log("connected");
    //    const result= await con.query(`SELECT post_property FROM information_schema.Tables WHERE table_schema="public" `);
       console.log((await con.query(`SELECT current_database()`)).rows);

       const result=await con.query(`SELECT * FROM property_owner`);
       console.log(result.rows)
    }catch(err){
        console.error(err.message)
    }finally{
        await con.end();
    }
}
getData()