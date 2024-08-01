"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let toDos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ toDos: toDos });
});
router.post('/todo', (req, res, next) => {
    const newToDo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    toDos.push(newToDo);
    res.status(201).json({ message: 'Added Todo', toDo: newToDo, toDos: toDos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const tId = req.params.todoId;
    const todoIndex = toDos.findIndex(item => item.id === tId);
    if (todoIndex >= 0) {
        toDos[todoIndex] = { id: tId, text: req.body.text };
        return res.status(200).json({ message: 'Updated todo', toDos: toDos });
    }
    res.status(404).json({ message: "Couldn't find todo for this id" });
});
router.delete('/todo/:todoId', (req, res, next) => {
    toDos = toDos.filter(item => item.id !== req.params.todoId);
    console.log(toDos);
    res.status(200).json({ message: 'Deleted todo', toDos: toDos });
});
exports.default = router;
