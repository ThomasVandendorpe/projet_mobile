export interface TodoList {
    id?: string,
    name: string,
    items: TodoItem[]
    owner: string,
    readers: string[],
    writers: string[]
}

export interface TodoItem {
    uuid?: string,
    name: string,
    desc?: string,
    complete: boolean
}
