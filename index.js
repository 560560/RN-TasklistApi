const express = require("express");
const app = express();
app.use(express.json())
let todos = [{id: "1", title: "Test todo"}]

app.get("/appName", (req, res) => {
    console.log(1234)
    res.send({appName: "AGRO APP!"})
})

app.get("/todos", (req, res) => {
    res.send(todos)
})

app.post("/todos", (req, res) => {
    if (req.body.title) {
        let newTodo = {id: Date.now().toString(), title: req.body.title}
        todos.push(newTodo)
        res.send({
            status: 201,
            newTodo
        })
    }
})

app.delete("/todos", (req, res) => {
    console.log(req)

})
app.listen(4000, () => {
    console.log("Server is listening")
})