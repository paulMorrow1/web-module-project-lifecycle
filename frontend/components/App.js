import React from "react";
import axios from "axios";
import TodoList from "./TodoList";
import Form from "./Form";

// const URL = "http://localhost:9000/api/todos"

export default class App extends React.Component {
  state = {
    todos: [],
  };

  addTodo = (e, name) => {
    axios
      .post("http://localhost:9000/api/todos", { name: name })
      .then((res) => {
        console.log("Post Data", res);
        this.setState({
          todos: [
            ...this.state.todos,
            {
              id: Math.random(),
              name: res.data.data,
              finished: false,
            },
          ],
        });
      });
  };

  deleteTodo = (id) => {
    const todoListAfterDeletion = this.state.todos.filter((todo) => {
      if (todo.id === id) return null;
      return todo;
    });
    this.setState((state) => {
      return {
        ...state,
        todos: todoListAfterDeletion,
      };
    });
  };

  toggleTodo = (itemId) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (itemId === id) {
          return {
            ...item,
            finsihed: !item.finished,
          };
        }
        return item;
      }),
    });
  };

  render() {
    return (
      <div>
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          deleteTodo={this.deleteTodo}
        />
        <Form addTodo={this.addTodo} />
      </div>
    );
  }
}
