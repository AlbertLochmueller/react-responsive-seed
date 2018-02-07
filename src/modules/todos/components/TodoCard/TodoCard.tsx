import * as React from 'react';
import {style} from 'typestyle';
import Paper from 'material-ui/Paper';
import {Component} from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {Todo} from "../../interfaces/Todo";
import {TodoState} from "../../enums/TodoState";
import {theme} from "../../../../components/App/ui-theme";
import {TodoItem} from "../TodoItem/TodoItem";

export interface TodoCardProps {
    name: string;
    todos: Todo[];

    onChange(todo: Todo, action: TodoState);

    onDelete(todo: Todo);
}

export interface TodoCardState {
    todos: Todo[];
}

const todoCardClasses = {
    paper: style({
        padding: 0,
        width: '100%' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    content: style({
        padding: 12,
        width: '100%' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    roleHeader: style({
        width: '100%' as any,
        height: 75,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
        background: theme.palette.background.paper,
    }),
    divider: style({
        height: 1,
        width: '100%' as any,
    })
};

export class TodoCard extends Component<TodoCardProps, TodoCardState> {

    render() {
        const {name, onChange, onDelete, todos} = this.props;

        return (
            <Paper elevation={2}
                   className={todoCardClasses.paper}>
                <div className={todoCardClasses.roleHeader}>
                    <Typography type="subheading"
                                style={{color: theme.palette.primary.A400}}
                                noWrap={true}>
                        {name}
                    </Typography>
                </div>
                <Divider className={todoCardClasses.divider}/>
                <div className={todoCardClasses.content}>
                    {
                        todos.length > 0 ?
                            todos.map((todo, index) => (
                                <div key={index} style={{width: '100%', margin: theme.spacing.unit}}>
                                    <TodoItem
                                        todo={todo}
                                        onChange={(action) => onChange(todo, action)}
                                        onDelete={() => onDelete(todo)}
                                    />
                                </div>
                            ))
                            :
                            <div>
                                X
                            </div>
                    }
                </div>

            </Paper>
        )
    }
}