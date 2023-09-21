import React from 'react';
import PropTypes from 'prop-types';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
Task.propTypes = {
  task: PropTypes.object,
  onCheckboxClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}