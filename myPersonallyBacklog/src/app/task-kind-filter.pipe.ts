import { Pipe, PipeTransform } from '@angular/core';
import { BacklogTask } from './backlog-task/backlogtask.model';

@Pipe({
  name: 'taskKindFilter',
  pure: false
})
export class TaskKindFilterPipe implements PipeTransform {

  transform(value: any, filterKind: BacklogTask.Status[]): any {
    if(value.lengt === 0 || filterKind === null){
      return value;
    }
    const resultArray = [];
    for(const item of value){
      for(const element of filterKind){
        if(item.taskKind === element){
          resultArray.push(item);
        }
      }
    }
    
    return resultArray;
  }

}
