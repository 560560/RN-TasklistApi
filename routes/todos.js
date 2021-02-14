const express = require("express")
const router = express.Router()
const Todo = require('../models/todo')


router.get("/appName", (req, res) => {
    res.send({appName: "СПИСОК ЗАДАЧ"})
})

router.get("/status", (req, res) => {
    res.send({status: true})
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

router.post("/todo-done", async (req, res) => {
    try {
        if (req.body.id) {
            const updateStatus = await Todo.updateOne({_id: req.body.id}, {isDone: req.body.isDone})
            const modifidedTodo = await Todo.findById(req.body.id)
            if (updateStatus.nModified) {
                res.send({
                    status: "Success",
                    modifidedTodo: modifidedTodo
                })
            } else {
                res.send({
                    status: "Fail"
                })
            }
        }
    } catch
        (err) {
        console.log(err)

    }
})

router.post("/todo-edit", async (req, res) => {
    try {

        if (req.body.id && req.body.newTitle) {
            const updateStatus = await Todo.updateOne({_id: req.body.id}, {title: req.body.newTitle})
            const modifidedTodo = await Todo.findById(req.body.id)

            if (updateStatus.nModified) {
                res.send({
                    status: "Success",
                    modifidedTodo: modifidedTodo
                })
            } else {
                res.send({
                    status: "Fail"
                })
            }
        }


    } catch (err) {
        console.log(err)

    }

})

router.delete("/todos", async (req, res) => {
    try {
        if (req.body.id) {
            const removedTodo = await Todo.deleteOne({_id: req.body.id})
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