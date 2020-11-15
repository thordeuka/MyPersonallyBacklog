//Es gibt zwei Unterschiedliche Items: Topics und Tasks.
//Topics sind Tasks ohne Parent, sie haben als

import { BacklogTaskService } from './backlogtask.service';

//Todo:
//Klassen trennen - topic und task
// Bei der Baumdarstellung wird dann ein Task einfach innerhlab eines Topics angezeigt also <app-task> innerhalb der topic componente oder eben in einer weiteren Task komponente

export class BacklogTask{ // TODO: in BacklogItem umbenennen

    constructor
    (
        public id: number,
        public parent: number,
        public title: string,
        public description: string,
        public estimation: number,
        public taskKind: BacklogTask.Kind,
        public status: BacklogTask.Status
    ){}

    public getStatusAsString(): String 
    {
        return BacklogTask.Status[this.status];
    }

    public setStatusByString(theStatus: string)
    {
        this.status = BacklogTask.Status[theStatus];
    }
    
    public getKindAsString(): String 
    {
        return BacklogTask.Kind[this.taskKind];
    }

    public setKindByString(theKind: string)
    {
        this.taskKind = BacklogTask.Status[theKind];
    }
}

export namespace BacklogTask{

    export enum Status {
        New = 0,
        Postponed = 1,
        Planned = 2,
        InProgress = 3,
        Done = 4
    }

    export enum Kind {
        Implementation = 0,
        Testing = 1,
        Documentation = 2
    }
}
