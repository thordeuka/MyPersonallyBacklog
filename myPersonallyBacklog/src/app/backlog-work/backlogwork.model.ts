export class BacklogWork{

    constructor
    (
        public id: number,
        public parent: number,
        public title: string,
        public description: string,
        public status: BacklogWork.Status

    ){}

}

export namespace BacklogWork{
    
    export enum Status {
        Open,
        InProgress,
        Done
    }
}