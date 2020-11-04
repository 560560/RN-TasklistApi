const express = require("express");

const app = express();

app.get("/appName", (req, res)=>{
    res.send({appName: "AGRO APP"})

})

app.listen(4000, () => {
    console.log("Server is listening")
})