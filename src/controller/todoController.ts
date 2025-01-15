import { Request, Response } from "express";
import { TodoApp } from "../models/TodoApp";
import { Task } from "../models/Task";

const todoApp = new TodoApp();

todoApp.addTask(new Task("Buy groceries"));
todoApp.addTask(new Task("Walk the dog", true));

console.log(todoApp["tasks"]);

const getHome = (req: Request, res: Response): void => {
    const error_msg = req.query.error_msg;
    res.render("index", { tasks: todoApp["tasks"], error_msg });
};

const addTask = (req: Request, res: Response): void => {
    const { task } = req.body;
    if (task) {
        todoApp.addTask(new Task(task));
        console.log(todoApp);
        res.redirect("/");
    } else {
        res.redirect("/?error_msg=Task is required");
    }
};

const editTask = (req: Request, res: Response): void => {
    const { newTask } = req.body;
    const id: string = req.params.id;
    if (id && newTask) {
        const isUpdated = todoApp.updateTask(id, newTask);
        if (isUpdated) {
            res.json({ success: true });
        } else {
            res.redirect("/?error_msg=Task not found");
        }
    } else {
        res.redirect("/?error_msg=Invalid data");
    }
};

const deleteTask = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    if (id) {
        const task = todoApp.getTaskById(id);
        if (task) {
            todoApp.deleteTask(id);
            res.json({ success: true });
        } else {
            res.redirect("/?error_msg=Task not found");
        }
    } else {
        res.redirect("/?error_msg=Something went wrong");
    }
};

const toggleTask = (req: Request, res: Response): void => {
    const taskId = req.params.id;
    const { status } = req.body;
    if (taskId) {
        const task = todoApp.getTaskById(taskId);
        if (task) {
            task.completed = !task.completed;
            res.json({success: true})
        } else {
            res.redirect('/?error_msg=Task not found')
        }
    } else {
        res.redirect('/?error_msg=Something went wrong')
    }
};

export default {
    getHome,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
};
