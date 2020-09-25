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

  @Output('onFilterChanged') filterChangedEvent : EventEmitter<boolean[]> = new EventEmitter<boolean[]>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onCheckedChange(){
    console.log("checkedChanged");
    console.log(this.featureChecked);
    console.log(this.refactoringChecked);
    console.log(this.bugChecked);
    
    let checkedstatus: boolean[] = [this.featureChecked, this.refactoringChecked, this.bugChecked];
    
    
    
    this.filterChangedEvent.emit(checkedstatus);
  }

}
