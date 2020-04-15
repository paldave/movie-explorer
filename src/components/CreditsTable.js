import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from './layout/Button';
import { getYear } from '../helpers/movie';
import { hasData } from '../helpers/object';
import './CreditsTable.scss';

class CreditsTable extends Component {
  static propTypes = {
    movieCredits: PropTypes.object,
    tvCredits: PropTypes.object
  }
  
  state = {
    creditsToShow: 'movieCredits'
  }

  changeCredits = (id, event) => {
    if (this.state.creditsToShow === id) {
      event.preventDefault();
    } else {
      this.setState({ creditsToShow: id });
    }
  }

  goToDetails = (id) => {
    const redirectPath = `/${this.state.creditsToShow === 'movieCredits' ? 'movies' : 'tv'}/details/${id}`;
    this.props.history.push(redirectPath);
  }

  renderSelectionButtons() {
    return (
      <div className="credits-buttons">
        <Button label="Movies"
          className="test" 
          disabled={!hasData(this.props.movieCredits)}
          onClick={(event) => this.changeCredits('movieCredits', event)}
        />
        <Button 
          label="Series" 
          disabled={!hasData(this.props.tvCredits)}
          onClick={(event) => this.changeCredits('tvCredits', event)}
        />
      </div>
    );
  }

  renderTableRow(item, showYear = true) {
    return (
      <tr className="table-item" onClick={() => this.goToDetails(item.id)}>
        <td className="item-year">
          {showYear && (
            <>
              {getYear(item.release_date || item.first_air_date) || '-'}
            </>
          )}
          </td>
        <td>
          <span className="item-title">{item.title || item.name || '-'}</span>
          {item.episode_count > 0 && (
            <span className="white-med-color">
              {` [${item.episode_count} ${item.episode_count > 1 ? 'episodes' : 'episode'}]`}
            </span>
          )}
          <span className="white-med-color"> as </span> 
          {item.character || item.job || '-'}
        </td>
      </tr>
    )
  }

  renderTable(dataName, departmentName) {
    const data = this.props[dataName];

    return (
      <table className="table-main">
        <caption className="name">{departmentName}</caption>
        <tbody>
          {Object.keys(data[departmentName]).reverse().map((key) => (
            <tr key={key} className="table-group">
              <td>
                <table>
                  <tbody>
                    {data[departmentName][key].map((item) => (
                      <Fragment key={item.id}>
                        {this.renderTableRow(item)}
                        {item.extras && (
                          <>
                            {item.extras.map((extra, index) => (
                              <Fragment key={`${item.id}-${index}`}>
                                {this.renderTableRow(extra, false)}
                              </Fragment>
                            ))}
                          </>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const dataName = this.state.creditsToShow;

    if (!hasData(this.props[dataName])) {
      return (
        <p className="no-available">There are no available items.</p>
      );
    }

    return (
      <>
        {this.renderSelectionButtons()}  
        {Object.keys(this.props[dataName]).map((departmentName) => (
          <Fragment key={`${dataName}${departmentName}`}>
            {this.renderTable(dataName, departmentName)}
          </Fragment>
        ))}
      </>
    )
  }
}

export default withRouter(CreditsTable);
