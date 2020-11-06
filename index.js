const express = require("express");
const app = express();
app.use(express.json())
let todos = [{id: "1", title: "Test todo"}]

app.get("/appName", (req, res) => {
    res.send({appName: "AGRO APP"})
})

app.get("/todos", (req, res) => {
    res.send(todos)
})

app.post("/todos", (req, res) => {
    console.log(req.body)

    if (req.body.title) {
        let newTodo = {id: Date.now().toString(), title: req.body.title}
        todos.push(newTodo)
        res.send({
            status: 201,
            newTodo
        })
    }
})

app.listen(4000, () => {
    console.log("Server is listening")
})