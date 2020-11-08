import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { BacklogTask } from './backlog-task/backlogtask.model'
import { BacklogTopic } from './backlog-topic/backlogtopic.model'
import { BacklogTaskService } from './backlog-task/backlogtask.service'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'myPersonallyBacklog';
  public myTopics: BacklogTopic[];
  public currentTopicFilter: BacklogTopic.Kind[] = [BacklogTopic.Kind.Feature];
  public currentParentFilter: boolean;
  
  constructor(private backlogtaskService: BacklogTaskService, private router:Router, private route:ActivatedRoute){} // HIER  weiter zu topics ändern anstatt tasks
  
  ngOnInit(): void {
    console.log("ngOnInit()");
    this.myTasks = this.backlogtaskService.getTasks();
  }

  onAddTask(){
    console.log("OnAddTask()");
    //this.backlogtaskService.addTask({parentId: 1, title: "Title", description: "Descvrg", kind: BacklogTask.TaskKind.Feature});
    this.router.navigate(['newtask'], {relativeTo: this.route});
  }

  onFilterBarFilterChanged(event: any){
    console.log('Emitted event catched via onFilterBarFilterChanged' + event);
    this.currentaskFilter = event;
  }

  onFilterBarParentFilterChanged(event: any){
    console.log('Emitted event catched via onFilterBarParentFilterChanged' + event);
    this.currentParentFilter = event;
  }

}
