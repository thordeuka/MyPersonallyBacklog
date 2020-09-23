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
  
  public  myTasks: BacklogTask[];
  
  constructor(private backlogtaskService: BacklogTaskService){}
  
  ngOnInit(): void {
    console.log("ngOnInit()");
    this.myTasks = this.backlogtaskService.getTasks()
  }
  
  title = 'myPersonallyBacklog';

  onAddTask(){
    console.log("OnAddTask()");
    this.backlogtaskService.addTask({parentId: 1, title: "Title", description: "Descvrg", kind: BacklogTask.TaskKind.Feature});
  }

}
