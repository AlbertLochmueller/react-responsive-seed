import {TodoState} from "../enums/TodoState";

export interface Todo {
    id: number,
    value: string,
    state: TodoState
}