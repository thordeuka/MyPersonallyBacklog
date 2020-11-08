import { Component, Input, OnInit } from '@angular/core';
import { BacklogTopic } from './backlogtopic.model';
import { BacklogTopicService } from './backlogtopic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-backlog-topic',
  templateUrl: './backlog-topic.component.html',
  styleUrls: ['./backlog-topic.component.css']
})
export class BacklogTopicComponent implements OnInit {

  @Input('TopicId') backlogTopicId: number;
  public backlogTopic: BacklogTopic;
  
  constructor(private backlogTopicService: BacklogTopicService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.backlogTopic = this.backlogTopicService.getTopicById(this.backlogTopicId);
  }

  onEditClick(){
    console.log(this.backlogTopic.title + ": edit was clicked!");
    this.router.navigate(['edittopic', this.backlogTopicId], {relativeTo: this.route});
  }

  onDeleteClick(){
    console.log(this.backlogTopic.title + ": delete was clicked!");
    this.backlogTopicService.removeTopic(this.backlogTopicId);
  }

  onAddTaskClick(){
    console.log(this.backlogTopic.title + ": add work was clicked!");
  }

}
