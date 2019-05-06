import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeState } from '../../actions/panelStateAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

// component
class StickyPanel extends Component {
  handleClick () {
    this.props.changeState(!this.props.showPanel);
  }

  render () {
    return (

      <div className={this.props.showPanel ? 'stickyPanel' : 'stickyPanel-disabled'}>
        <FontAwesomeIcon
          className='panelBtn'
          onClick={() => this.handleClick()}
          icon={this.props.showPanel ? faChevronCircleDown : faChevronCircleUp}
        />
        <div className='Icons'>
          <a className='first_f'>
            <SocialIcon
              url='https://www.tumblr.com/dashboard'
              className='tumbler'
              network='tumblr'
              color='#faeed7'
              style={{ height: 55, width: 55 }}
            />
          </a>
          <a className='middle'>
            <SocialIcon
              url='https://twitter.com/home?status=wow'
              id='twitter' network='twitter'
              color='#faeed7'
              style={{ height: 55, width: 55 }}
            />
          </a>
          <a className='last_f'>
            <SocialIcon
              url='https://vk.com/bloodforbloodgod'
              className='vk'
              network='vk'
              color='#faeed7'
              style={{ height: 55, width: 55 }}
            />
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    showPanel: state.actions.showPanel
  };
}

StickyPanel.propTypes = {
  showPanel: PropTypes.bool.isRequired,
  changeState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { changeState })(StickyPanel);
