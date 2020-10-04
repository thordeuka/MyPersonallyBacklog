export class BacklogTask{

    constructor
    (
        public id: number,
        public parent: number,
        public title: string,
        public description: string,
        public taskKind: BacklogTask.TaskKind,
        public status: BacklogTask.Status

    ){}

}

export namespace BacklogTask{
    
    export enum TaskKind {
        Feature,
        Refactoring,
        Bug
    }

    export enum Status {
        New,
        Postponed,
        Planned,
        InProgress,
        Done,
        TestCovered
    }
}