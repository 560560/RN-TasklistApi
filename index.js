const express = require("express");

const app = express();

app.get("/api", (req, res)=>{
    res.send({method: "GET"})

})

app.listen(4000, () => {
    console.log("Server is listening")
})