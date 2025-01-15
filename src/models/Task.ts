import {v4 as uuidv4 } from 'uuid';

export class Task {
    constructor(
        public task: string, 
        public completed: boolean = false,
        public readonly id: string = uuidv4()
    ){}

    editTask(newTask: string):void {
        this.task = newTask
    }

    markCompleted(): void {
        this.completed = true;
    }

    markIncomplete(): void {
        this.completed = false;
    }
}