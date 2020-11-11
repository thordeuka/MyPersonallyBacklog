import { Injectable } from '@angular/core';
import { BacklogTask} from './backlogtask.model';

@Injectable({
    providedIn: 'root',
})
export class BacklogTaskService{

    private nextId: number = 4;
    
    public myTasks: BacklogTask[] = [
        new BacklogTask(1, 1, "Erster Task","Die 1. Beschreibung", BacklogTask.Kind.Documentation, BacklogTask.Status.Planned),
        new BacklogTask(2, 2, "Zweiter Task","Die 2. Beschreibung", BacklogTask.Kind.Implementation, BacklogTask.Status.InProgress),
        new BacklogTask(3, 2, "Dritter Task","Die 4. Beschreibung", BacklogTask.Kind.Testing, BacklogTask.Status.Done)
      ]    
    
    constructor(){}

    public getTasks(): BacklogTask[] {
        return this.myTasks;
    }

    public getTaskById(id: number): BacklogTask {
        for(const item of this.myTasks){
            if(item.id === id){
            return item;
            }
        }
        return null;             
    }

    public getAllTasksByParentId(id: number) : BacklogTask[]{
        
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

    addTask(newTask: {parentId: number, title: string, description: string, kind: BacklogTask.Kind}): void {

        let theNewTask = new BacklogTask(this.nextId, newTask.parentId, newTask.title, newTask.description, newTask.kind, BacklogTask.Status.New);
        this.myTasks.push(theNewTask);
        this.nextId++;

    }

    removeTask(id: number){
        this.myTasks.splice(this.myTasks.findIndex(item => item.id === id), 1);
    }


}