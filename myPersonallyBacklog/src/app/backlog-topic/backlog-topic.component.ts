import { Component, Input, OnInit } from '@angular/core';
import { BacklogTopic } from './backlogtopic.model';
import { BacklogTopicService } from './backlogtopic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BacklogTask } from '../backlog-task/backlogtask.model';
import { BacklogTaskService } from '../backlog-task/backlogtask.service';
import { Subscription } from 'rxjs';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-backlog-topic',
  templateUrl: './backlog-topic.component.html',
  styleUrls: ['./backlog-topic.component.css']
})
export class BacklogTopicComponent implements OnInit {

  @Input('TopicId') backlogTopicId: number;
  @Input('ShowOnlyTopics') showOnlyTopics: boolean; 
  
  public backlogTopic: BacklogTopic;
  public backlogTasks: BacklogTask [];
  public isExpanded: boolean;

  private tasksChangedSub: Subscription;
  private taskDepthChangedSub: Subscription;
  
  constructor(private backlogTopicService: BacklogTopicService, private backlogTaskService: BacklogTaskService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.backlogTopic = this.backlogTopicService.getTopicById(this.backlogTopicId);
    this.backlogTasks = this.backlogTaskService.getAllTasksByParentId(this.backlogTopicId);

    this.taskDepthChangedSub = this.backlogTaskService.shownTaskDepthSubject.subscribe(depth => {
      console.log("Subscription aktiviert: Tiefe = " + depth);
      this.calcDepthIsShown(depth);
    })
    this.tasksChangedSub = this.backlogTaskService.tasksChangedSubject.subscribe(taskList => {
      this.backlogTasks = this.backlogTaskService.getAllTasksByParentId(this.backlogTopicId);
      console.log("Subscription aktiviert");
    })
  }

  calcDepthIsShown(depth: number)
  {
    this.isExpanded = depth > 0 ? true : false; 
  }

  onEditClick(){
    console.log(this.backlogTopic.title + ": edit was clicked!");
    this.router.navigate(['edittopic', this.backlogTopicId], {relativeTo: this.route});
  }

  hasChilds(): boolean
  {
    return this.backlogTasks.length > 0 ? true : false;
  }

  onDeleteClick(){
    console.log(this.backlogTopic.title + ": delete was clicked!");
    this.backlogTopicService.removeTopic(this.backlogTopicId);
  }

  onAddTaskClick(){
    console.log(this.backlogTopic.title + ": add work was clicked!");
  }

}
