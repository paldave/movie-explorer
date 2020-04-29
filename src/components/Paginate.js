import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Paginate = ({ currentPage, totalPages, queryPage, handlePageClick }) => {
  let page;
  if (currentPage === 0) {
    page = queryPage - 1 || currentPage ;
  } else {
    page = currentPage - 1
  }

  return (
    <ReactPaginate
      previousLabel={(<IoIosArrowBack/>)}
      nextLabel={(<IoIosArrowForward/>)}
      breakLabel='...'
      breakClassName='item break'
      pageClassName='item'
      previousClassName='item previous'
      nextClassName='item next'
      pageCount={totalPages}
      forcePage={page}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName='pagination'
      subContainerClassName='pages pagination'
      activeClassName='active'
    />
  )
}

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  queryPage: PropTypes.number,
  handlePageClick: PropTypes.func.isRequired
}

export default Paginate
