import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { BacklogTask } from './backlog-task/backlogtask.model'
import { BacklogTopic } from './backlog-topic/backlogtopic.model'
import { BacklogTopicService } from './backlog-topic/backlogtopic.service'
import { BacklogTaskService } from './backlog-task/backlogtask.service'
import {ActivatedRoute, Router} from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'myPersonallyBacklog';
  public myTopics: BacklogTopic[];
  public currentTopicKindFilter: BacklogTopic.Kind[] = [BacklogTopic.Kind.Feature];
  public currentOnlyTopicsFilter: boolean;

  private topicsChangedSub: Subscription;
  
  constructor(private backlogtaskService: BacklogTaskService, private backlogtopicService: BacklogTopicService, private router:Router, private route:ActivatedRoute){} // HIER  weiter zu topics ändern anstatt tasks
  
  ngOnInit(): void {
    console.log("ngOnInit()");
    this.myTopics = this.backlogtopicService.getTopics();

    this.topicsChangedSub = this.backlogtopicService.topicChangedSubject.subscribe(topicList => {
      this.myTopics = this.backlogtopicService.getTopics();
      console.log("Subscription aktiviert");
    })    
  }

  // Only for testing, can be removed when Task Adding is implemented ///////////////////////
  onAddTestTask(){
    console.log("OnAddTestTask()");
    this.backlogtaskService.addTestTask();
    //this.router.navigate(['newtask'], {relativeTo: this.route});
  }

  onAddTestTopic(){
    console.log("OnAddTestTopic()");
    this.backlogtopicService.addTestTopic();
    //this.router.navigate(['newtopic'], {relativeTo: this.route});
  }

  onFilterBarFilterChanged(event: any){
    console.log('Emitted event catched via onFilterBarFilterChanged' + event);
    this.currentTopicKindFilter = event;
  }

  onFilterBarTopicFilterChanged(event: any){
    console.log('Emitted event catched via onFilterBarParentFilterChanged' + event);
    this.currentOnlyTopicsFilter = event;
    console.log("filter changed");
  }

}
