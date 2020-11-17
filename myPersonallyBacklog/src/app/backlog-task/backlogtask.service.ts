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
    shownTaskDepthSubject = new Subject<number>();
    public myTasks: BacklogTask[] = [];
    
    constructor(private globalIdentifierService: GlobalIdentifierService)
    {
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

    public getDepthOfTask(id: number): number
    {
        let theTask: any = this.getTaskById(id);
        let theDepth: number = 0;
        while(theTask!=null)
        {
            theDepth++;
            theTask = this.getTaskById(theTask.parent);
        }
        return theDepth;
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

    addTask(newTask: {parentId: number, title: string, description: string, estimation: number, kind: BacklogTask.Kind}): number
    {
        let taskId = this.globalIdentifierService.fetchNextId();
        let theNewTask = new BacklogTask(taskId, newTask.parentId, newTask.title, newTask.description, newTask.estimation, newTask.kind, BacklogTask.Status.New);
        this.myTasks.push(theNewTask);
        this.tasksChangedSubject.next(this.myTasks.slice());
        return taskId;

    }

    updateTask(theId: number, theKeyValues: any)
    {
        let theTask = this.getTaskById(theId);
        for (let key in theKeyValues)
        {
            if((key != "taskKind") && (key != "status"))
            {
                if(theTask[key])theTask[key] = theKeyValues[key];
            }
            else if(key === "taskKind")
            {
                theTask.setKindByString(theKeyValues[key]);
            }
            else if(key === "status")
            {
                theTask.setStatusByString(theKeyValues[key]);
            } 
        }
        this.tasksChangedSubject.next(this.myTasks.slice());
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
            9.9, 
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