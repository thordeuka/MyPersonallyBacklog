import { Component, Input, OnInit } from '@angular/core';
import { BacklogTask } from './backlogtask.model';

@Component({
  selector: 'app-backlog-task',
  templateUrl: './backlog-task.component.html',
  styleUrls: ['./backlog-task.component.css']
})
export class BacklogTaskComponent implements OnInit {

  @Input('Task') backlogTask: BacklogTask;
  
  constructor() { }

  ngOnInit(): void {
  }

  onEditClick(){
    console.log(this.backlogTask.title + " was clicked!")
  }

}
