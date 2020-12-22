const express = require("express")
const router = express.Router()
const Todo = require('../models/todo')


router.get("/appName", (req, res) => {
    res.send({appName: "СПИСОК ЗАДАЧ"})
})

router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find().sort({_id: -1})
        res.send(todos)
    } catch (err) {
        console.log(err)
    }
})

router.post("/todos", async (req, res) => {
    if (req.body.title) {
        let newTodo = new Todo({
            title: req.body.title,
            isDone: false
        })
        try {
            const savedTodo = await newTodo.save()
            res.send({
                status: 201,
                savedTodo: savedTodo
            })
        } catch (err) {
            console.log(err)
        }

    }
})

router.post("/todo-done",async (req, res) => {
    try {

        if (req.body.id && req.body.isDone) {
            const updatedTodo = await Todo.updateOne({_id: req.body.id}, {isDone: req.body.isDone})

            res.send({
                status: 201,
                modifidedTodo: updatedTodo
            })
        }
    }
    catch (err) {
        console.log(err)

    }
})

router.post("/todo-edit", async (req, res) => {
    try {

        if (req.body.id && req.body.newTitle) {
            const updatedTodo = await Todo.updateOne({_id: req.body.id}, {title: req.body.newTitle})

            res.send({
                status: 201,
                modifidedTodo: updatedTodo
            })
        }

    }
    catch (err) {
        console.log(err)

    }


})

router.delete("/todos", async (req, res) => {
    try {
        if (req.body.id) {
            const removedTodo = await Todo.remove({_id: req.body.id})
            if (removedTodo["deletedCount"] === 1) {
                res.send({
                    message: `Todo with id ${req.body.id} was delete successfully`,
                    status: "Success"
                })
            } else {
                res.send({
                    message: `Todo with id ${req.body.id} was NOT deleted`,
                    status: "Fail"
                })
            }

        }
    } catch (err) {
        console.log(err)
    }


})


module.exports = router