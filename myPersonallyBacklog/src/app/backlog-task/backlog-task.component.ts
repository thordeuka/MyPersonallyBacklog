import { Component, Input, OnInit } from '@angular/core';
import { BacklogTask } from './backlogtask.model';
import { BacklogTaskService } from './backlogtask.service';

@Component({
  selector: 'app-backlog-task',
  templateUrl: './backlog-task.component.html',
  styleUrls: ['./backlog-task.component.css']
})
export class BacklogTaskComponent implements OnInit {

  @Input('TaskId') backlogTaskId: number;
  public backlogTask: BacklogTask;
  
  constructor(private backlogTaskService: BacklogTaskService) { }

  ngOnInit(): void {
    this.backlogTask = this.backlogTaskService.getTaskById(this.backlogTaskId);
  }

  onEditClick(){
    console.log(this.backlogTask.title + ": edit was clicked!");
  }

  onDeleteClick(){
    console.log(this.backlogTask.title + ": delete was clicked!");
    this.backlogTaskService.removeTask(this.backlogTaskId);
  }

}
