const express = require("express");

const app = express();

app.get("/appName", (req, res)=>{
    res.send({appName: "Agro App!"})

})

app.listen(4000, () => {
    console.log("Server is listening")
})