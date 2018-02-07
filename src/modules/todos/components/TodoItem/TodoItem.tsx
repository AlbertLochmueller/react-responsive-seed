import * as React from 'react';
import {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import {Todo} from "../../interfaces/Todo";
import {style} from 'typestyle';
import {TodoState} from "../../enums/TodoState";
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import DoneIcon from 'material-ui-icons/Done';
import {theme} from "../../../../components/App/ui-theme";

export interface TodoItemProps {
    todo: Todo;

    onChange(action: TodoState);
    onDelete();
}

const todoItemClasses = {
   todoItem: style({
       width: '100%' as any,
       display: 'flex' as any,
       alignItems: 'center' as any,
       textAlign: 'left' as any,
       $nest: {
           '&:hover': {
               background: theme.palette.background.paper
           }
       }
   }),
    action: style({
        color: theme.palette.secondary.A400,
        transition: 'color 0.25s linear',
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    })
};

export const TodoItem = ({todo, onChange, onDelete}: TodoItemProps) => (
    <ListItem key={todo.id} dense button className={todoItemClasses.todoItem}>
        <ListItemText secondary={`${todo.value}`}/>
        <ListItemSecondaryAction>
            {todo.state !== TodoState.inProgress &&
            <IconButton onClick={() => onChange(TodoState.inProgress)} className={todoItemClasses.action}>
                <KeyboardArrowRightIcon/>
            </IconButton>
            }
            {
                todo.state !== TodoState.done &&
                <IconButton onClick={() => onChange(TodoState.done)} className={todoItemClasses.action}>
                    <DoneIcon/>
                </IconButton>
            }
            <IconButton onClick={() => onDelete()} className={todoItemClasses.action}>
                <DeleteIcon/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);