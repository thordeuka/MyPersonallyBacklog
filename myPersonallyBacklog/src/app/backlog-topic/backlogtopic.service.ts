import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalIdentifierService } from '../global-identifier.service';
import { BacklogTopic} from './backlogtopic.model';

@Injectable({
    providedIn: 'root',
})
export class BacklogTopicService{

    topicChangedSubject = new Subject<BacklogTopic[]>();   
    public myTopics: BacklogTopic[] = [];   
    
    constructor(private globalIdentifierService: GlobalIdentifierService)
    {
    }

    public getTopics(): BacklogTopic[] {
        return this.myTopics;
    }

    public getTopicById(id: number): BacklogTopic {
        for(const item of this.myTopics){
            if(item.id === id){
            return item;
            }
        }
        return null;             
    }

    addTopic(newTopic: {title: string, description: string, kind: BacklogTopic.Kind}): number {

        let topicId = this.globalIdentifierService.fetchNextId();
        let theNewTopic = new BacklogTopic(topicId, newTopic.title, newTopic.description, newTopic.kind, BacklogTopic.Status.Open);
        this.myTopics.push(theNewTopic);
        this.topicChangedSubject.next(this.myTopics.slice());
        return topicId;

    }

    // Only for testing, can be removed when Task Adding is implemented ///////////////////////
    addTestTopic(): void 
    {   
        let topicStatus: number = this.getRandomInt(3);
        let topicKind: number = this.getRandomInt(3);
        
        let theNewTopic = new BacklogTopic(
            this.globalIdentifierService.fetchNextId(), 
            "Test Topic", 
            "Description for this topic", 
            topicKind,
            topicStatus);
        
        this.myTopics.push(theNewTopic);
        console.log("Added TestTopic: " + JSON.stringify(theNewTopic));
        this.topicChangedSubject.next(this.myTopics.slice());
    }

    getRandomInt(max: number)
    {
        return Math.floor(Math.random() * Math.floor(max));
    }

    removeTopic(id: number){
        this.myTopics.splice(this.myTopics.findIndex(item => item.id === id), 1);
        this.topicChangedSubject.next(this.myTopics.slice());
    }


}