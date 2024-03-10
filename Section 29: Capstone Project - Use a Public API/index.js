import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://api.openuv.io/api/v1";
const API_KEY = "openuv-4i79rltl581is-io"


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
  });

app.post("/get-action", async (req,res) => {
    try{
        
        const response = await axios.get(API_URL+"/uv",{
            params: {lat: req.body.latitude, lng: req.body.longitude},
            headers: {"x-access-token": API_KEY},
        });
        const uvValue = response.data.result.uv;
        if (uvValue >= 2){
            res.render("index.ejs", {content: "take sunscreen"});
        }else{
            res.render("index.ejs", {content: "you are safe today!"});
        }
        
    } catch(error){
        console.log("error")
        // res.render("index.ejs", {content: JSON.stringify(error.response.data)});
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})