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
  // public taskDepth: number;
  
  private topicsChangedSub: Subscription;
  
  constructor(private backlogtaskService: BacklogTaskService, private backlogtopicService: BacklogTopicService, private router:Router, private route:ActivatedRoute){} // HIER  weiter zu topics ändern anstatt tasks
  
  ngOnInit(): void {
    console.log("ngOnInit()");

    this.myTopics = this.backlogtopicService.getTopics();

    this.topicsChangedSub = this.backlogtopicService.topicChangedSubject.subscribe(topicList => {
      this.myTopics = this.backlogtopicService.getTopics();
      console.log("Subscription aktiviert");
    })

    // this.tasksChangedSub = this.backlogtaskService.tasksChangedSubject.subscribe(taskList => {
    //   console.log("Subscription aktiviert");
    // })
    
    this.addTestScenario();
  }

  addTestScenario()
  {
        let currenTopictId: number;
        let currenTasktId: number;

        currenTopictId = this.backlogtopicService.addTopic({title: "Erstes Topic", description: "Die 1. Beschreibung", kind: BacklogTopic.Kind.Feature});
        currenTasktId = this.backlogtaskService.addTask({parentId: currenTopictId, title: "Erster Task", description: "Die 1. Beschreibung", estimation: 1.2, kind: BacklogTask.Kind.Documentation});
        currenTasktId = this.backlogtaskService.addTask({parentId: currenTasktId, title: "Erster ChildTask", description: "Die 1. Child Beschreibung", estimation: 32, kind: BacklogTask.Kind.Implementation});
        currenTasktId = this.backlogtaskService.addTask({parentId: currenTasktId, title: "Zweiter ChildChildTask", description: "Die 2. ChildChild Beschreibung", estimation: 12, kind: BacklogTask.Kind.Documentation});
        currenTasktId = this.backlogtaskService.addTask({parentId: currenTasktId, title: "Dritter ChildChildTask", description: "Die 3. ChildChild Beschreibung", estimation: 12, kind: BacklogTask.Kind.Documentation});
        currenTasktId = this.backlogtaskService.addTask({parentId: currenTasktId, title: "Vierter ChildChildTask", description: "Die 4. ChildChild Beschreibung", estimation: 12, kind: BacklogTask.Kind.Documentation});
        currenTopictId = this.backlogtopicService.addTopic({title: "Zweites Topic", description: "Die 2. Beschreibung", kind: BacklogTopic.Kind.Refactoring});
        this.backlogtaskService.addTask({parentId: currenTopictId, title: "Zweiter Task", description: "Die 2. Beschreibung",estimation: 120.3,  kind: BacklogTask.Kind.Implementation});
        this.backlogtaskService.addTask({parentId: currenTopictId, title: "Dritter Task", description: "Die 3. Beschreibung",estimation: 130.9,  kind: BacklogTask.Kind.Testing});
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
  
  // onFilterBarTaskDepthChanged(event: number)
  // {
  //   this.taskDepth = event;
  //   console.log("taskDepth changed");
  // }

}
