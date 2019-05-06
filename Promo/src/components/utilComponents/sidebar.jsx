import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPath } from '../../actions/setPathAction';

// component
class Sidebar extends PureComponent {
  handleClick (page) {
    if (this.props.showSidebar) { this.props.setPath(page); }
  }

  render () {
    return (
      <div
        className={this.props.showSidebar ? 'navList' : 'navList-disabled'}
      >
        <ul style={{fontSize: '45px'}}>
          <li>
            <a href='#'>
              <FontAwesomeIcon
                onClick={() => this.handleClick('/home')}
                icon={faHome} />
            </a>
          </li>
          <li>
            <a href='#'>
              <FontAwesomeIcon
                onClick={() => this.handleClick('/products')}
                icon={faBriefcase}
              />
            </a>
          </li>
          <li>
            <a
              href='mailto:Staaalker@tut.by'>
              <FontAwesomeIcon
                icon={faEnvelope}
              />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    showSidebar: state.actions.showSidebar
  };
}

Sidebar.propTypes = {
  setPath: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { setPath })(Sidebar);
