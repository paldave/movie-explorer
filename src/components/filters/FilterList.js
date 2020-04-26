import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterCard from './FilterCard';
import { RELEASE_DATE } from '../../helpers/query';

const FilterList = ({ handleSubmit, userQuery, availableGenres }) => {
  const [state, setState] = useState(userQuery);
  const [searchDisabled, setSearch] = useState(true);

  
  const onQueryChange = (data) => {
    let { type } = data;
    
    if (Array.isArray(data)) {
      type = data[0].type;
    }

    if (searchDisabled) {
      setSearch((prevState) => setSearch(!prevState));
    }

    if (data.isEmpty) {
      return setState((prevState) => ({ ...prevState, [data.type]: [] }));
    }

    return setState((prevState) => ({ ...prevState, [type]: data }));
  }

  return (
    <>
      <FilterCard 
        name="Sort"
        onQueryChange={onQueryChange}
        filters={
          [
            { 
              name: 'Results by', 
              type: 'dropdown', 
              defaultValue: state.sort_by,
            }
          ]
        }
        />
      <FilterCard 
        name="Filters"
        onQueryChange={onQueryChange}
        filters={
          [
            { 
              name: 'Genres', 
              type: 'genres', 
              availableGenres,
              defaultValue: state.with_genres
            },
            {
              name: 'Release Dates',
              type: 'datepicker',
              defaultValue: [
                state[RELEASE_DATE.greaterThan.type] || RELEASE_DATE.greaterThan,
                state[RELEASE_DATE.lessThan.type] || RELEASE_DATE.lessThan
              ]
            }
          ]
        }
      />
      <button 
        className={`filter-card search-button ${  searchDisabled ? 'disabled' : ''}`} 
        onClick={() => { handleSubmit(state); setSearch((prevState) => setSearch(!prevState)) }}
      >
        <h3 className="label">Search</h3>
      </button>
    </>
  )
}

FilterList.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  userQuery: PropTypes.object.isRequired,
  availableGenres: PropTypes.object.isRequired
}

export default FilterList
