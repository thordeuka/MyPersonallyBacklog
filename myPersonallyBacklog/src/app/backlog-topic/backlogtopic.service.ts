import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BacklogTopic} from './backlogtopic.model';

@Injectable({
    providedIn: 'root',
})
export class BacklogTopicService{

    topicChangedSubject = new Subject<BacklogTopic[]>();

    private nextId: number = 4;
    
    public myTopics: BacklogTopic[] = [
        new BacklogTopic(1, "Erstes Topic","Die 1. Beschreibung", BacklogTopic.Kind.Feature, BacklogTopic.Status.Open),
        new BacklogTopic(2, "Zweites Topic","Die 2. Beschreibung", BacklogTopic.Kind.Refactoring, BacklogTopic.Status.Open),
        new BacklogTopic(3, "Drittes Topic","Die 4. Beschreibung", BacklogTopic.Kind.Bug, BacklogTopic.Status.Open)
      ]    
    
    constructor(){}

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

    addTopic(newTopic: {title: string, description: string, kind: BacklogTopic.Kind}): void {

        let theNewTopic = new BacklogTopic(this.nextId, newTopic.title, newTopic.description, newTopic.kind, BacklogTopic.Status.Open);
        this.myTopics.push(theNewTopic);
        this.nextId++;
        this.topicChangedSubject.next(this.myTopics.slice());

    }

    // Only for testing, can be removed when Task Adding is implemented ///////////////////////
    addTestTopic(): void 
    {   
        let topicStatus: number = this.getRandomInt(3);
        let topicKind: number = this.getRandomInt(3);
        
        let theNewTopic = new BacklogTopic(
            this.nextId, 
            "Test Topic", 
            "Description for this topic", 
            topicKind,
            topicStatus);
        
        this.myTopics.push(theNewTopic);
        this.nextId++;
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