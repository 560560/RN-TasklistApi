const express = require("express");
const app = express();
app.use(express.json())

let todos = [{id: "1", title: "Тестовая задача", isDone: true}]

app.get("/appName", (req, res) => {
    res.send({appName: "СПИСОК ЗАДАЧ"})
})

app.get("/todos", (req, res) => {
    res.send(todos)
})

app.post("/todos", (req, res) => {
    if (req.body.title) {
        let newTodo = {id: Date.now().toString(), title: req.body.title, isDone: false}
        console.log(todos)
        todos.unshift(newTodo)
        console.log(todos)
        res.send({
            status: 201,
            newTodo
        })
    }
})

app.post("/todo-done", (req, res) => {
    if (req.body.id) {

        todos.map(todo => {
            if (todo.id === req.body.id) {
                todo.isDone = !todo.isDone
                return todo
            } else {
                return todo
            }

        })
        let todoForAnswer = todos.filter(todo => todo.id === req.body.id)
        res.send({
            status: 201,
            modifidedTodo: todoForAnswer
        })
    }
})


app.post("/todo-edit", (req, res) => {
    if (req.body.id && req.body.newTitle) {

        todos.map(todo => {
            if (todo.id === req.body.id) {
                todo.title = req.body.newTitle
                return todo
            } else {
                return todo
            }

        })
        let todoForAnswer = todos.filter(todo => todo.id === req.body.id)
        res.send({
            status: 201,
            modifidedTodo: todoForAnswer
        })
    }
})





app.delete("/todos", (req, res) => {
    if (req.body.id){
        todos = todos.filter(todo => todo.id !== req.body.id)
        res.send({
            message: `Todo with id " ${req.body.id} was delete successfully`,
            status: "Success"
        })
    }

})
app.listen(4000, () => {
    console.log("Server is listening")
})