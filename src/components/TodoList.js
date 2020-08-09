import React from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

export default class TodoList extends React.Component {
  state = {
    todos: [],
    todoToShow: 'all',
    toggleAllComplete: true,
  };

  addTodo = (todo) => {
    this.setState(state=>({
      todos: [todo, ...state.todos],
    }));
  };

  toggleComplete = (id) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    }));
  };

  updateTodoToShow = (s) => {
    this.setState({
      todoToShow: s,
    });
  };

  handleDeleteTodo = (id) => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  };

  removeAllTodosThatAreComplete = () => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.complete),
    }));
  };

  render() {
    let todos = [];

    if (this.state.todoToShow === 'all') {
      todos = this.state.todos;
    } else if (this.state.todoToShow === 'active') {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else if (this.state.todoToShow === 'complete') {
      todos = this.state.todos.filter((todo) => todo.complete);
    }

    return (
      <div className='todoform'>
        <div style={{textAlign:'center'}}>
          Todos left: {this.state.todos.filter((todo) => !todo.complete).length}
        </div>
        <div style={{textAlign:'center'}}>
          <button onClick={() => this.updateTodoToShow('all')}>all {this.state.todos.filter((todo) => todo).length}</button>
          <button onClick={() => this.updateTodoToShow('active')}>
            active {this.state.todos.filter((todo) => !todo.complete).length}
          </button>
          <button onClick={() => this.updateTodoToShow('complete')}>
            complete {this.state.todos.filter((todo) => todo.complete).length}
          </button>
        </div>
        {this.state.todos.some((todo) => todo.complete) ? (
          <div style={{textAlign:'center'}}>
            <button onClick={this.removeAllTodosThatAreComplete}>
              remove all complete todos
            </button>
          </div>
        ) : null}
        <div style={{textAlign:'center'}}>
          <button
            onClick={() =>
              this.setState((state) => ({
                todos: state.todos.map((todo) => ({
                  ...todo,
                  complete: state.toggleAllComplete,
                })),
                toggleAllComplete: !state.toggleAllComplete,
              }))
            }
          >
            toggle all complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
          />
        ))}
      </div>
    );
  }
}
