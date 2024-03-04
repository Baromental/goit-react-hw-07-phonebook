// Filter.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterContacts, selectFilter } from '../redux/filterSlice';
import s from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(filterContacts(event.target.value.toLowerCase().trim()));
  };

  return (
    <form>
      Find contacts by name
      <input type="text" name="filter" value={filter} onChange={handleChange} className={s.input} />
    </form>
  );
};

export default Filter;