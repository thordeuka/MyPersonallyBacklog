import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms'
import { BacklogTask } from '../backlog-task/backlogtask.model';
import { BacklogTaskService } from '../backlog-task/backlogtask.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @ViewChild('f', {static:true}) signupForm: NgForm;

  constructor(private backlogTaskService: BacklogTaskService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.signupForm);
    
    //let newTask: {parentId: number, title: string, description: string, kind: BacklogTask.TaskKind} = {
    //  parentId: null,
    //}
    
     
    this.backlogTaskService.addTask(
      {
        parentId: null,
        title: this.signupForm.value.taskTitle,
        description: this.signupForm.value.taskDescription,
        kind: BacklogTask.TaskKind.Refactoring
      }
    );
  }

}
