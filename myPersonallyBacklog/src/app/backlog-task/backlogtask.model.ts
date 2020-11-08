//Es gibt zwei Unterschiedliche Items: Topics und Tasks.
//Topics sind Tasks ohne Parent, sie haben als

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
        public taskKind: BacklogTask.Kind,
        public status: BacklogTask.Status

    ){}

}

export namespace BacklogTask{

    export enum Status {
        New,
        Postponed,
        Planned,
        InProgress,
        Done,
        TestCovered // only for Topics
    }

    export enum Kind {
        Implementation,
        Testing,
        Documentation
    }
}
