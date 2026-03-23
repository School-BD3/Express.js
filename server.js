const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

const tasks = [];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { title } = req.body;

    const newTask = {
        id: tasks.length + 1,
        title: title
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
});

app.patch("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (title) {
        task.title = title;
    }

    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(index, 1);

    res.json(deletedTask);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});