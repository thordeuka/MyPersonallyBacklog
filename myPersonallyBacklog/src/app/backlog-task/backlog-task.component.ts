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
  public isExpanded: boolean;

  private tasksChangedSub: Subscription;
  private taskDepthChangedSub: Subscription;
  
  constructor(private backlogTaskService: BacklogTaskService, private router:Router, private route:ActivatedRoute)
  { 
  }

  ngOnInit(): void {
    
    this.backlogTask = this.backlogTaskService.getTaskById(this.backlogTaskId);
    this.childTasks = this.backlogTaskService.getAllTasksByParentId(this.backlogTaskId);
    console.log("ngOnInit: " + this.backlogTaskId);
    this.calcDepthIsShown(this.backlogTaskService.shownTaskDepth);

    this.tasksChangedSub = this.backlogTaskService.tasksChangedSubject.subscribe(taskList => {
      this.childTasks = this.backlogTaskService.getAllTasksByParentId(this.backlogTaskId);
    })

    this.taskDepthChangedSub = this.backlogTaskService.shownTaskDepthSubject.subscribe(depth => {
      this.calcDepthIsShown(depth);
    })
    
  }

  calcDepthIsShown(depth: number)
  {
    console.log("calcDepthIsShown: Task " + this.backlogTask.id); 
    let taskDepth = this.backlogTaskService.getDepthOfTask(this.backlogTaskId);
    this.isExpanded = taskDepth < depth ? true : false;
  }

  onEditClick(){
    console.log(this.backlogTask.title + ": edit was clicked!");
    this.router.navigate(['edittask', this.backlogTaskId], {relativeTo: this.route});
  }

  hasChilds(): boolean
  {
    return this.childTasks.length > 0 ? true : false;
  }

  onDeleteClick(){
    console.log(this.backlogTask.title + ": delete was clicked!");
    this.backlogTaskService.removeTask(this.backlogTaskId);
  }

  onAddSubTaskClick(){
    console.log(this.backlogTask.title + ": add work was clicked!");
    this.router.navigate(['newtask', this.backlogTaskId], {relativeTo: this.route});
  }

  onToggleCollapse()
  {
    this.isExpanded = !this.isExpanded;
  }

}
