const express = require("express");

const app = express();


let todos = [
    {id: "1", title: "Test todo"},

]

app.get("/appName", (req, res) => {
    res.send({appName: "AGRO APP"})

})

app.get("/todos", (req, res) => {
    res.send(todos)
})

app.listen(4000, () => {
    console.log("Server is listening")
})