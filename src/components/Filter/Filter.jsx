import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { wrapper, input } from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  const filterInputId = uuidv4();
  return (
    <div className={wrapper}>
      <label htmlFor={filterInputId}>Find contacts by name</label>
      <input className={input}
        type="text"
        id={filterInputId}
        placeholder="Enter contact name..."
        value={value}
        onChange={onChangeFilter}
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
