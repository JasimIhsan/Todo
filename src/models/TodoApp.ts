import { Task } from "./Task";

export class TodoApp {
    private tasks: Task[] = [];

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    updateTask(id: string, newTask: string): boolean {
        const task: Task | undefined = this.getTaskById(id);
        if (task) {
            task.editTask(newTask);
            return true;
        }
        return false;
    }

    deleteTask(id: string): boolean {
        const index: number = this.tasks.findIndex((task: Task): boolean => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    getTaskById(id: string): Task | undefined {
        return this.tasks.find((task: Task): boolean => task.id === id);
    }
}
