import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BacklogTopic} from '../backlog-topic/backlogtopic.model';

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

  @Output('onFilterChanged') filterChangedEvent : EventEmitter<BacklogTopic.Kind[]> = new EventEmitter<BacklogTopic.Kind[]>();
  @Output('onOnlyParentsChanged') filterParentsChangedEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
    this.onCheckedChange();
    this.onOnlyParentsCheckedChange();
  }

  onCheckedChange(){
    console.log("checkedChanged: " + this.featureChecked + " " + this.refactoringChecked + " " + this.bugChecked);
    
    let checkedstatus: BacklogTopic.Kind[] = [];
    if(this.featureChecked)checkedstatus.push(BacklogTopic.Kind.Feature);
    if(this.refactoringChecked)checkedstatus.push(BacklogTopic.Kind.Refactoring);
    if(this.bugChecked)checkedstatus.push(BacklogTopic.Kind.Bug);
    
    this.filterChangedEvent.emit(checkedstatus);
  }

  onOnlyParentsCheckedChange(){
    this.filterParentsChangedEvent.emit(this.onlyParentsChecked);
  }

}
