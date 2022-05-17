import React from "react";
import axios from "axios";
import TodoList from "./TodoList";
import Form from "./Form";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    error: "",
    todoNameInput: "",
    displayCompleteds: true,
  };

  onTodoNameInputChange = (event) => {
    const { value } = event.target;
    this.setState({ ...this.state, todoNameInput: value });
  };

  resetForm = () => {
    this.setState({ ...this.state, todoNameInput: "" });
  };

  setAxiosResError = (err) => {
    this.setState({ ...this.state, error: err.response.data.message });
  };

  postNewTodo = () => {
    axios
      .post(URL, { name: this.state.todoNameInput })
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data),
        });
        this.resetForm();
      })
      .catch(this.setAxiosResError);
  };

  onTodoFormSubmit = (event) => {
    event.preventDefault();
    this.postNewTodo();
  };

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch(this.setAxiosResError);
  };

  toggleCompleted = (id) => () => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((todo) => {
            if (todo.id !== id) {
              return todo;
            }
            return res.data.data;
          }),
        });
      })
      .catch(this.setAxiosResError);
  };

  toggleDisplayCompleteds = () => {
    this.setState({
      ...this.state,
      displayCompleteds: !this.state.displayCompleteds,
    });
  };

  componentDidMount() {
    //fetch all Todo's from server
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <TodoList
          todos={this.state.todos}
          displayCompleteds={this.state.displayCompleteds}
          toggleCompleted={this.toggleCompleted}
        />

        <Form
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange}
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
          todoNameInput={this.state.todoNameInput}
          displayCompleteds={this.state.displayCompleteds}
        />
      </div>
    );
  }
}
