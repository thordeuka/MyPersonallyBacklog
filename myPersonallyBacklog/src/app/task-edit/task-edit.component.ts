import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  private parentId: number;
  public currentTask: BacklogTask;
  
  public submitCaption: string;
  private editMode: boolean;
  public headline: String;

  // Initialization here is necessary otherwise the form data binding doesn't work
  public formData: {title: String, description: String, estimation: number, taskKind: String, taskStatus: String} = 
  {
    title: "",
    description: "",
    estimation: 0,
    taskKind: "Implementation",
    taskStatus: "New"
  };

  constructor(private backlogTaskService: BacklogTaskService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    
    this.route.params.subscribe( 
      (params:Params) => {
        console.log(params)
        this.taskId = params['id'];
        this.parentId = params['parentId'];
        this.editMode = params['id'] != null;
        this.initForm();       
      }
      );
    console.log("INIT");
  }
 
  initForm()
  {
    if(this.editMode) this.initEditMode();
    else this.initNewMode();

  }

  initEditMode()
  {
    this.currentTask = this.backlogTaskService.getTaskById(+this.taskId);
    this.submitCaption = "Save";
    this.headline = "Editiere Task# " + this.currentTask.id;

    if(this.currentTask === null)
    {
      console.error("Task doesn't exist!!!");
    }
    
    this.formData = 
    {
      title: this.currentTask.title,
      description: this.currentTask.description,
      estimation: this.currentTask.estimation,
      taskKind: this.currentTask.getKindAsString(),
      taskStatus: this.currentTask.getStatusAsString()
    }
  }

  initNewMode()
  {
    this.submitCaption = "Create";
    this.headline = "Erstelle neuen ChildTask für Id# " + this.parentId;
  }

  onCreateChildTask()
  {
    this.router.navigate(['newtask', this.currentTask.id]);
  }

  onEditViewLoad()
  {
    console.log("Lade Editmode mit Id: " + this.taskId);
    this.currentTask = this.backlogTaskService.getTaskById(+this.taskId);
    this.initForm();
  }

  onSubmit()
  {
    console.log(this.signupForm);
    if(this.editMode)
    {
      this.backlogTaskService.updateTask(
        this.currentTask.id, 
        {
          title: this.formData.title,
          description: this.formData.description,
          estimation: this.formData.estimation,
          taskKind: this.formData.taskKind,
          status: this.formData.taskStatus
        });
    }
    else
    {
      this.backlogTaskService.addTask(
        {
          parentId: +this.parentId,
          title: this.formData.title,
          description: this.formData.description,
          estimation: this.formData.estimation,
          kind: BacklogTask.Kind[this.formData.taskKind.toString()]
        }
      );
    }
  }
}
