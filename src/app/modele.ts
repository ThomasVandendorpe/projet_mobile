export interface TodoList {
    id?: string,
    name: string,
    items: TodoItem[]
}

export interface TodoItem {
    uuid?: string,
    name: string,
    desc?: string,
    complete: boolean
}
