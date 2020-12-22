const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv/config")

const PORT = process.env.PORT || 4000
app.use(express.json())

const todosRoute = require("./routes/todos")

app.use("/", todosRoute)

async function start() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            },
            () => {
                console.log("Connected to DB")
            })
        app.listen(PORT, () => {
            console.log("Server is listening")
        })
    } catch (e) {
        console.log(e)
    }
}

/*
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
    if (req.body.id) {
        todos = todos.filter(todo => todo.id !== req.body.id)
        res.send({
            message: `Todo with id " ${req.body.id} was delete successfully`,
            status: "Success"
        })
    }

})
*/


start()