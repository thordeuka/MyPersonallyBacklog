import { Pipe, PipeTransform } from '@angular/core';
import { BacklogTopic } from './backlog-topic/backlogtopic.model';

@Pipe({
  name: 'topicKindFilter',
  pure: false
})
export class TopicKindFilterPipe implements PipeTransform {

  transform(value: any, filterKind: BacklogTopic.Kind[]): any {
    if(value.lengt === 0 || filterKind === null){
      return value;
    }
    const resultArray = [];
    for(const item of value){
      for(const element of filterKind){
        if(item.kind === element){
          resultArray.push(item);
        }
      }
    }
    return resultArray;
  }

}
