import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  public featureChecked: boolean = true;
  public refactoringChecked: boolean = true;
  public bugChecked: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  onCheckedChange(){
    console.log("checkedChanged");
    console.log(this.featureChecked);
    console.log(this.refactoringChecked);
    console.log(this.bugChecked);
  }

}
