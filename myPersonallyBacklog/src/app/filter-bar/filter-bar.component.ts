import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BacklogTask } from '../backlog-task/backlogtask.model';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  public featureChecked: boolean = true;
  public refactoringChecked: boolean = true;
  public bugChecked: boolean = true;
  public onlyParentsChecked: boolean = false;

  @Output('onFilterChanged') filterChangedEvent : EventEmitter<BacklogTask.TaskKind[]> = new EventEmitter<BacklogTask.TaskKind[]>();
  @Output('onOnlyParentsChanged') filterParentsChangedEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
    this.onCheckedChange();
    this.onOnlyParentsCheckedChange();
  }

  onCheckedChange(){
    console.log("checkedChanged: " + this.featureChecked + " " + this.refactoringChecked + " " + this.bugChecked);
    
    let checkedstatus: BacklogTask.TaskKind[] = [];
    if(this.featureChecked)checkedstatus.push(BacklogTask.TaskKind.Feature);
    if(this.refactoringChecked)checkedstatus.push(BacklogTask.TaskKind.Refactoring);
    if(this.bugChecked)checkedstatus.push(BacklogTask.TaskKind.Bug);
    
    this.filterChangedEvent.emit(checkedstatus);
  }

  onOnlyParentsCheckedChange(){
    this.filterParentsChangedEvent.emit(this.onlyParentsChecked);
  }

}
