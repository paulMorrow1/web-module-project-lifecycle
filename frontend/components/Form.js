import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
          <input
            value={this.props.todoNameInput}
            type="text"
            placeholder="Type todo"
            onChange={this.props.onTodoNameInputChange}
          />
          <input type="submit" />
        </form>
        <button onClick={this.props.toggleDisplayCompleteds}>
          {this.props.displayCompleteds ? "Hide" : "Show"} Completed
        </button>
      </>
    );
  }
}
