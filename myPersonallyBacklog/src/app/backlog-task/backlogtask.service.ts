import { Injectable } from '@angular/core';
import { BacklogTask } from './backlogtask.model';

@Injectable({
    providedIn: 'root',
})
export class BacklogTaskService{

    private nextId: number = 4;
    
    public myTasks: BacklogTask[] = [
        new BacklogTask(1,null,"Erster Task","Die 1. Beschreibung",BacklogTask.TaskKind.Feature, BacklogTask.Status.Planned),
        new BacklogTask(2,1,"Zweiter Task","Die 2. Beschreibung",BacklogTask.TaskKind.Refactoring, BacklogTask.Status.InProgress),
        new BacklogTask(3,2,"Dritter Task","Die 4. Beschreibung",BacklogTask.TaskKind.Bug, BacklogTask.Status.Done)
      ]    
    
    constructor(){}

    public getTasks(): BacklogTask[] {
        return this.myTasks;
    }

    addTask(newTask: {parentId: number, title: string, description: string, kind: BacklogTask.TaskKind}): void {

        let theNewTask = new BacklogTask(this.nextId, newTask.parentId, newTask.title, newTask.description, newTask.kind, BacklogTask.Status.New);
        this.myTasks.push(theNewTask);
        this.nextId++;

    }


}