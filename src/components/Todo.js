import React from 'react';

export default (props) => (
  <div
    className="todoitem"
  >
    <div
      className="todoitem-text"
      style={{
        textDecoration: props.todo.complete ? 'line-through' : '',
      }}
      onClick={props.toggleComplete}
    >
      {props.todo.text}
    </div>
    <button className="todoitem-btn" onClick={props.onDelete}>
      x
    </button>
  </div>
);
