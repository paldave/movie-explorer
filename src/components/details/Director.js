import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Director = ({ data, label }) => {
  return (
    <p className="director">
      <span className="white-med-color">{`${label} `}</span>
      {data.length > 0 ? (
        <>
          {data.map((author) => (
            <Link key={author.id} to={`/person-details/${author.id}`}>
              <span className="name">{author.name}</span>
            </Link>
          ))}
        </>
      ) : (
        <Link key={data.id} to={`/person-details/${data.id}`}>
          <span className="name">{data.name}</span>
        </Link>
      )}
    </p>
  )
}

Director.propTypes = {
  data: PropTypes.object,
  label: PropTypes.string
}

export default Director;