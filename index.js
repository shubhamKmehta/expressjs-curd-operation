import 'dotenv/config'
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
const hostname ='127.0.0.1'

app.use(express.json())

let storeData =[];
let nextId =1;
// add to new data
app.post("/teas",(req,res)=>{
    const {model,price} = req.body;
    const newData = {id: nextId++,model,price};
    let Data = storeData.push(newData);
   
    res.status(201).send(newData);
    console.log(Data);
    
})
// route to get all data
app.get("/teas",(req,res)=>{
    res.status(200).send(storeData)
})

// get data with id

app.get("/teas/:id",(req,res)=>{
   const dataItem = storeData.find(t => t.id === parseInt(req.params.id));
   console.log(dataItem);
   if(!dataItem){
    res.status(404).send('item not found')
   }
   res.status(201).send(dataItem);
})

// update data

app.put("/teas/:id",(req,res)=>{
    const dataItem = storeData.find(t => t.id === parseInt(req.params.id))

    if(!dataItem){
        res.status(404).send("item not found")
    }
    const {model,price} = req.body
    dataItem.model = model;
    dataItem.price = price;
    res.status(200).send("dataItem updated")
})


// data delete

app.delete('/teas/:id',(req,res)=>{
    const index = storeData.findIndex(t => t.id === parseInt(req.params.id))
    if(index == -1){
        return res.status(404).send("data not found")
    }
    storeData.splice(index,1)
    return res.status(200).send("deleted")

})

app.listen(port,()=>{
    console.log(`server is listening on http://${hostname}:${port}`);
})