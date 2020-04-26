import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SORT_BY } from '../../helpers/query';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import './FilterCard.scss';

import Select from 'react-select';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const FilterCard = ({ name, filters, onQueryChange }) => {
  const [closed, openFilter] = useState(true);

  const _FilterDropdown = (defaultValue) => {
    return (
      <Select 
        options={Object.values(SORT_BY)}
        defaultValue={defaultValue}
        onChange={onQueryChange}
        className="select-dropdown"
        classNamePrefix="select-dropdown"
        isSearchable={false}
      />
    )
  }

  const _FilterGenres = (availableGenres, defaultValue) => {
    const _checkValues = (event) => {
      if (!event || event.length === 0) {
        event = {
          type: 'with_genres',
          isEmpty: true
        }
      }

      onQueryChange(event, 'with_genres');
    }

    return (
      <Select 
        options={Object.values(availableGenres)}
        defaultValue={defaultValue}
        onChange={(event) => _checkValues(event)}
        className="select-dropdown"
        classNamePrefix="select-dropdown"
        isMulti={true}
        isSearchable={false}
      />
    )
  }

  const _FilterDates = (defaultValue) => {
    const _checkDate = (date, stateObject) => {
      onQueryChange({ ...stateObject, value: date });
    }

    return (
      <>
        <div className="date-from">
          <span className="label">{defaultValue[0].label}</span>
          <span>
            <DatePicker 
              selected={defaultValue[0].value}
              onChange={(date) => _checkDate(date, defaultValue[0])}
              dateFormat="yyyy-MM"
              placeholderText="Click to select a date"
              showMonthYearPicker
            />
          </span>
        </div>
        <div className="date-to">
          <span className="label">{defaultValue[1].label}</span>
          <span>
            <DatePicker 
              selected={defaultValue[1].value}
              onChange={(date) => _checkDate(date, defaultValue[1])}
              dateFormat="yyyy-MM"
              placeholderText="Click to select a date"
              showMonthYearPicker
            />
          </span>
        </div>
      </>
    )
  }

  return (
    <div className={`filter-card ${closed ? 'closed' : ''}`}>
      {name && (
        <div className="name" onClick={() => openFilter(!closed)}>
          <h3>{name}</h3>
          <h3>
            {closed ? (
              <IoIosArrowForward/>
            ) : (
              <IoIosArrowDown/>
            )}
          </h3>
        </div>
      )}
      {filters.map((filter) => (
        <div key={filter.name} className="filter-item">
          <h4>{filter.name}</h4>
          {filter.type === 'dropdown' && (
            _FilterDropdown(filter.defaultValue)
          )}
          {filter.type === 'genres' && (
            _FilterGenres(filter.availableGenres, filter.defaultValue)
          )}
          {filter.type === 'datepicker' && (
            _FilterDates(filter.defaultValue)
          )}
        </div>
      ))}
    </div>
  )
}

FilterCard.propTypes = {
  name: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  onQueryChange: PropTypes.func.isRequired
}

export default FilterCard
