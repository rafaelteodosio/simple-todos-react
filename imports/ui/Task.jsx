import React from 'react';
import PropTypes from 'prop-types';

export const Task = ({ task, onCheckboxClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
    </li>
  );
};
Task.propTypes = {
  task: PropTypes.object,
  onCheckboxClick: PropTypes.func
}