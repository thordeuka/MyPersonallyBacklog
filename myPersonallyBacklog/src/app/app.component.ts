import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { BacklogTask } from './backlog-task/backlogtask.model';
import { BacklogTaskService } from './backlog-task/backlogtask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'myPersonallyBacklog';
  public myTasks: BacklogTask[];
  public currentaskFilter: BacklogTask.TaskKind[] = [BacklogTask.TaskKind.Feature];
  
  constructor(private backlogtaskService: BacklogTaskService){}
  
  ngOnInit(): void {
    console.log("ngOnInit()");
    this.myTasks = this.backlogtaskService.getTasks();
  }

  onAddTask(){
    console.log("OnAddTask()");
    this.backlogtaskService.addTask({parentId: 1, title: "Title", description: "Descvrg", kind: BacklogTask.TaskKind.Feature});
  }

  onFilterBarFilterChanged(event: any){
    console.log('Emitted event via onFilterBarFilterChanged' + event);
  }

}
