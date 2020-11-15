import { Component, Input, OnInit } from '@angular/core';
import { BacklogTask } from './backlogtask.model';
import { BacklogTaskService } from './backlogtask.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backlog-task',
  templateUrl: './backlog-task.component.html',
  styleUrls: ['./backlog-task.component.css']
})
export class BacklogTaskComponent implements OnInit {

  @Input('TaskId') backlogTaskId: number;
  public backlogTask: BacklogTask;
  public childTasks: BacklogTask [];

  private tasksChangedSub: Subscription;
  
  constructor(private backlogTaskService: BacklogTaskService, private router:Router, private route:ActivatedRoute)
  { 
  }

  ngOnInit(): void {
    this.backlogTask = this.backlogTaskService.getTaskById(this.backlogTaskId);
    this.childTasks = this.backlogTaskService.getAllTasksByParentId(this.backlogTaskId);

    this.tasksChangedSub = this.backlogTaskService.tasksChangedSubject.subscribe(taskList => {
      this.childTasks = this.backlogTaskService.getAllTasksByParentId(this.backlogTaskId);
      console.log("Subscription aktiviert");
    })
  }

  onEditClick(){
    console.log(this.backlogTask.title + ": edit was clicked!");
    this.router.navigate(['edittask', this.backlogTaskId], {relativeTo: this.route});
  }

  onDeleteClick(){
    console.log(this.backlogTask.title + ": delete was clicked!");
    this.backlogTaskService.removeTask(this.backlogTaskId);
  }

  onAddWorkClick(){
    console.log(this.backlogTask.title + ": add work was clicked!");
  }

}
