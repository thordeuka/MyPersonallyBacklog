import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalIdentifierService } from '../global-identifier.service';
import { BacklogTask} from './backlogtask.model';

@Injectable({
    providedIn: 'root',
})
export class BacklogTaskService
{
    tasksChangedSubject = new Subject<BacklogTask[]>();
    public myTasks: BacklogTask[] = [];
    
    constructor(private globalIdentifierService: GlobalIdentifierService)
    {
        // this.myTasks = [
        //     new BacklogTask(this.globalIdentifierService.fetchNextId(), 1, "Erster Task","Die 1. Beschreibung", BacklogTask.Kind.Documentation, BacklogTask.Status.Planned),
        //     new BacklogTask(this.globalIdentifierService.fetchNextId(), 2, "Zweiter Task","Die 2. Beschreibung", BacklogTask.Kind.Implementation, BacklogTask.Status.InProgress),
        //     new BacklogTask(this.globalIdentifierService.fetchNextId(), 2, "Dritter Task","Die 4. Beschreibung", BacklogTask.Kind.Testing, BacklogTask.Status.Done)
        //   ]    
    }

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

    addTask(newTask: {parentId: number, title: string, description: string, kind: BacklogTask.Kind}): number
    {
        let taskId = this.globalIdentifierService.fetchNextId();
        let theNewTask = new BacklogTask(taskId, newTask.parentId, newTask.title, newTask.description, newTask.kind, BacklogTask.Status.New);
        this.myTasks.push(theNewTask);
        this.tasksChangedSubject.next(this.myTasks.slice());
        return taskId;

    }

    // Only for testing, can be removed when Task Adding is implemented ///////////////////////
    addTestTask(): void 
    {   
        let parentId: number = 1 + this.getRandomInt(3);
        let taskKind: number = this.getRandomInt(3);
        
        let theNewTask = new BacklogTask(
            this.globalIdentifierService.fetchNextId(), 
            parentId, 
            "Test Task with parent " + parentId, 
            "Description for this task of parent " + parentId, 
            taskKind,
            BacklogTask.Status.New);
        
            this.myTasks.push(theNewTask);
        console.log("Added TestTask: " + JSON.stringify(theNewTask));
        this.tasksChangedSubject.next(this.myTasks.slice());
    }
    
    getRandomInt(max: number)
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
    

    removeTask(id: number)
    {
        this.myTasks.splice(this.myTasks.findIndex(item => item.id === id), 1);
        this.tasksChangedSubject.next(this.myTasks.slice());
    }


}