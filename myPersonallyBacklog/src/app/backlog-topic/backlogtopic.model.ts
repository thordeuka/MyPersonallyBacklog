export class BacklogTopic{

    constructor
    (
        public id: number,
        public title: string,
        public description: string,
        public topicKind: BacklogTopic.Kind,
        public status: BacklogTopic.Status

    ){}
}

export namespace BacklogTopic{
    
    export enum Status {
        Open,
        InProgress,
        Done
    }

    export enum Kind {
        Feature,
        Refactoring,
        Bug
    }
}