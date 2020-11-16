import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';
import { BacklogTask} from '../backlog-task/backlogtask.model'
import {BacklogTaskService} from '../backlog-task/backlogtask.service'

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @ViewChild('f', {static:true}) signupForm: NgForm;
  
  private taskId: number;
  public currentTask: BacklogTask;
  public currenTaskStringStatus;
  public currenTaskStringKind;
  public submitCaption: string;

  constructor(private backlogTaskService: BacklogTaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.params.subscribe( 
      (params:Params) => {
        console.log(params)
        this.taskId = params['id'];
        this.initForm();       
      }
      );
    
    
    console.log("INIT");
  }

  onEditViewLoad(){
    console.log("Lade Editmode mit Id: " + this.taskId);
    this.currentTask = this.backlogTaskService.getTaskById(+this.taskId);
    this.initForm();
    //this.currenTaskStringStatus = this.currentTask.getStatusAsString();
    //this.currenTaskStringKind = this.currentTask.getKindAsString();


  }

  initForm()
  {
    this.currentTask = this.backlogTaskService.getTaskById(+this.taskId);

    // this.signupForm.setValue(
    //   {
    //     taskTitle: this.currentTask.title,
    //     taskDescription: this.currentTask.description,
    //     taskEstimation: this.currentTask.estimation,
    //     taskKind: this.currentTask.getKindAsString(),
    //     taskStatus: this.currentTask.getStatusAsString()
    //   }
    // );
    if(this.currentTask.id>0)
    {
      this.submitCaption = "Save";
    }
    else
    {
      this.submitCaption = "Create";
    }

    this.currenTaskStringStatus = this.currentTask.getStatusAsString();
    this.currenTaskStringKind = this.currentTask.getKindAsString();
  }
  
  
  onSubmit(){
    console.log(this.signupForm);
    
    //let newTask: {parentId: number, title: string, description: string, kind: BacklogTask.TaskKind} = {
    //  parentId: null,
    //}
    if(this.currentTask.id>0)
    {
      this.backlogTaskService.updateTask(
        this.currentTask.id, 
        {
          title: this.signupForm.value.taskTitle,
          description: this.signupForm.value.taskDescription,
          estimation: this.signupForm.value.taskEstimation,
          taskKind: this.signupForm.value.taskKind,
          status: this.signupForm.value.taskStatus
        });
    }
    else
    {
      this.backlogTaskService.addTask(
        {
          parentId: null,
          title: this.signupForm.value.taskTitle,
          description: this.signupForm.value.taskDescription,
          estimation: this.signupForm.value.taskEstimation,
          kind: BacklogTask.Kind.Implementation
        }
      );
    }
  }
}
