import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { BacklogTask } from './backlog-task/backlogtask.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public myTasks: BacklogTask[] = [
    new BacklogTask("Erster Task","Die 1. Beschreibung",BacklogTask.TaskKind.Feature, BacklogTask.Status.Planned),
    new BacklogTask("Zweiter Task","Die 2. Beschreibung",BacklogTask.TaskKind.Refactoring, BacklogTask.Status.InProgress),
    new BacklogTask("Dritter Task","Die 4. Beschreibung",BacklogTask.TaskKind.Bug, BacklogTask.Status.Done)
  ]
  
  ngOnInit(): void {
    console.log("ngOnInit()");
    this.myTasks
  }
  title = 'myPersonallyBacklog';

}
