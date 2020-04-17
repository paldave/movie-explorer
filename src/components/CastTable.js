import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ItemCast from './cards/ItemCast';
import './CastTable.scss';

class CastTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    apiConfig: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    includePhotos: PropTypes.bool
  }

  goToPersonDetails(id) {
    this.props.history.push(`/person-details/${id}`);
  }

  renderCastRow(item) {
    return (
      <>
        <td className="item-details">
          <span className="primary">{item.name}</span>
          <br/>
          <span className="white-med-color"> as </span> 
          <br/>
          {item.character || item.job}
        </td>
      </>
    );
  }

  renderCrewRow(item) {
    return (
      <>
        <td className="item-name">
          <span className="primary">{item.name}</span>
        </td>
        <td className="item-details">
          <span className="white-med-color"> as </span> 
          {item.character || item.job}
        </td>
      </>
    );
  }

  render() {
    const { data, name, includePhotos } = this.props;

    return (
      <table className={`table-main cast ${includePhotos ? 'include-photos' : ''}`}>
        <caption className="name">{`${name} (${data.length})`}</caption>
        <tbody>
          {data.map((item) => (
            <tr 
              className="table-item" 
              key={`${item.id}-${item.character || item.job}`}
              onClick={() => this.goToPersonDetails(item.id)}
            >
              {includePhotos ? (
                <>
                  <td className="item-photo">
                    <ItemCast 
                      data={item} 
                      apiConfig={this.props.apiConfig}
                      PROFILE_THUMBNAIL={true}
                    />
                  </td>
                  {this.renderCastRow(item)}
                </>
              ) : (
                <>
                  {this.renderCrewRow(item)}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default withRouter(CastTable);
