import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';
import { BacklogTask } from '../backlog-task/backlogtask.model';
import { BacklogTaskService } from '../backlog-task/backlogtask.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @ViewChild('f', {static:true}) signupForm: NgForm;
  private taskId: number;

  constructor(private backlogTaskService: BacklogTaskService, private route: ActivatedRoute) { 
    this.route.params.subscribe( 
      
      (params:Params) => {
        console.log(params)
        this.taskId = params['id'];
        this.onEditViewLoad();
      }
      );
  }

  ngOnInit(): void {
  }

  onEditViewLoad(){
    console.log("Lade Editmode mit Id: " + this.taskId);
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
