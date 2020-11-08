import { Injectable } from '@angular/core';
import { BacklogTopic} from './backlogtopic.model';

@Injectable({
    providedIn: 'root',
})
export class BacklogTopicService{

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

    }

    removeTopic(id: number){
        this.myTopics.splice(this.myTopics.findIndex(item => item.id === id), 1);
    }


}