import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentFilter',
  pure: false
})
export class ParentFilterPipe implements PipeTransform {

  transform(value: any, onlyParents: boolean): any {
    
    const resultArray = [];
    
    for(const item of value){
      if(onlyParents === true){
        if(item.parent === null) resultArray.push(item);
      }else{
        resultArray.push(item);
      }       
    }
    return resultArray;
  }
}
