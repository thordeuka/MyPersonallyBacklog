import { Injectable } from '@angular/core';
import { BacklogTask} from './backlogtask.model';

@Injectable({
    providedIn: 'root',
})
export class BacklogTaskService
{
    private nextId: number = 4;
    
    public myTasks: BacklogTask[] = [
        new BacklogTask(1, 1, "Erster Task","Die 1. Beschreibung", BacklogTask.Kind.Documentation, BacklogTask.Status.Planned),
        new BacklogTask(2, 2, "Zweiter Task","Die 2. Beschreibung", BacklogTask.Kind.Implementation, BacklogTask.Status.InProgress),
        new BacklogTask(3, 2, "Dritter Task","Die 4. Beschreibung", BacklogTask.Kind.Testing, BacklogTask.Status.Done)
      ]    
    
    constructor()
    {}

    public getTasks(): BacklogTask[]
    {
        return this.myTasks;
    }

    public getTaskById(id: number): BacklogTask
    {
        for(const item of this.myTasks){
            if(item.id === id){
            return item;
            }
        }
        return null;             
    }

    public getAllTasksByParentId(id: number) : BacklogTask[]
    {        
        let theTasks : BacklogTask[] = [];
        for(let i=0;i<this.myTasks.length; i++)
        {
            if(this.myTasks[i].parent === id)
            {
                theTasks.push(this.myTasks[i]);
            }
        }     
        return theTasks;
    }

    addTask(newTask: {parentId: number, title: string, description: string, kind: BacklogTask.Kind}): void
    {
        let theNewTask = new BacklogTask(this.nextId, newTask.parentId, newTask.title, newTask.description, newTask.kind, BacklogTask.Status.New);
        this.myTasks.push(theNewTask);
        this.nextId++;

    }

    // Only for testing, can be removed when Task Adding is implemented ///////////////////////
    addTestTask(): void 
    {   
        let parentId: number = this.getRandomInt(3);
        let taskKind: number = this.getRandomInt(3);
        
        let theNewTask = new BacklogTask(
            this.nextId, 
            parentId, 
            "Test Task with parent " + parentId, 
            "Description for this task of parent " + parentId, 
            taskKind,
            BacklogTask.Status.New);
        
            this.myTasks.push(theNewTask);
        this.nextId++;
        console.log("Added TestTask: " + JSON.stringify(theNewTask));
    }
    
    getRandomInt(max: number)
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
    

    removeTask(id: number)
    {
        this.myTasks.splice(this.myTasks.findIndex(item => item.id === id), 1);
    }


}