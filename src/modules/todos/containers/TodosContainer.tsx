import * as React from 'react';
import {Component} from 'react';
import {style} from 'typestyle';
import {theme} from '../../../components/App/ui-theme';
import {Todo} from "../interfaces/Todo";
import {TextInput} from "../../layout/components/Input/TextInput/TextInput";
import Paper from 'material-ui/Paper';
import {TodoState} from "../enums/TodoState";
import {TodoCard} from "../components/TodoCard/TodoCard";

const mainClasses = {
    root: style({
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        [theme.breakpoints.up('sm')]: {
            height: '35%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    }),
    addTodo: style({
        margin: theme.spacing.unit,
        width: 300,
        textAlign: 'center' as 'center',
        display: 'inline-block' as any,
        borderRadius: 4,
    }),
    todos: style({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    }),
    todoCard: style({
        width: 300,
        transition: 'width 0.15s linear',
        // $nest: {
        //     '&:hover': {
        //         width: 315,
        //     }
        // },
        margin: theme.spacing.unit
    })
};

export interface TodosContainerProps {

}

interface TodosContainerState {
    todos: Todo[];
    note: string;
}

export class TodosContainer extends Component<TodosContainerProps, TodosContainerState> {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            note: ''
        }
    }

    componentWillMount() {
    }

    addTodo() {

        const {note} = this.state;

        const todo: Todo = {
            id: Math.random() * 100,
            value: note,
            state: TodoState.todo,
        };

        this.setState({
            todos: [...this.state.todos, todo],
            note: ''
        }, () => this.forceUpdate())
    }

    takeNote(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    changeTodo(todo: Todo, action: TodoState) {
        const {todos} = this.state;

        const newTodos = todos.map((subTodo, index) => {
            if (subTodo.id == todo.id) {
                return {
                    id: subTodo.id,
                    value: subTodo.value,
                    state: action
                }
            }
            return subTodo;
        });

        this.setState({todos: newTodos});
    }

    deleteTodo(todo: Todo) {
        this.setState({
            todos: this.state.todos.filter(subTodo => subTodo.id !== todo.id)
        })
    }


    render() {
        const {todos, note} = this.state;

        return (
            <div className={mainClasses.root}>

                <Paper elevation={2} className={mainClasses.addTodo}>
                    <TextInput
                        name={'note'}
                        hasError={false}
                        placeholder={'get productive!'}
                        label={''}
                        defaultValue={note}
                        onChange={(event) => this.takeNote(event)}
                        onSubmit={() => this.addTodo()}
                    />
                </Paper>
                <div className={mainClasses.todos}>
                    <div className={mainClasses.todoCard}>
                        <TodoCard
                            name={'Todo'}
                            todos={todos.filter(todo => todo.state == TodoState.todo)}
                            onChange={(todo, action) => this.changeTodo(todo, action)}
                            onDelete={(todo) => this.deleteTodo(todo)}
                        />
                    </div>
                    <div className={mainClasses.todoCard}>
                        <TodoCard
                            name={'in Progress'}
                            todos={todos.filter(todo => todo.state == TodoState.inProgress)}
                            onChange={(todo, action) => this.changeTodo(todo, action)}
                            onDelete={(todo) => this.deleteTodo(todo)}
                        />
                    </div>
                    <div className={mainClasses.todoCard}>
                        <TodoCard
                            name={'Done'}
                            todos={todos.filter(todo => todo.state == TodoState.done)}
                            onChange={(todo, action) => this.changeTodo(todo, action)}
                            onDelete={(todo) => this.deleteTodo(todo)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

