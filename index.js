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

app.put("/todos", (req, res) => {
    console.log(req)
    if (req.body.title) {
        let newTodo = {id: Date.now().toString(), title: req.body.title}
        todos.push(newTodo)
        res.send({status: 201})
    }
})

app.listen(4000, () => {
    console.log("Server is listening")
})