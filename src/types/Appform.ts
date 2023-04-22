export interface Todo {
    id:number,
    task:string,
    description:string,
    category:string,
    due_date:string,
    status:number,
    order:number,
}

export interface TodoCategory {
    id:number,
    tag:string,
    name:string,
}