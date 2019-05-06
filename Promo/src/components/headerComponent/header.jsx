import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeState } from '../../actions/sidebarStateAction';
import { Overlay, Tooltip } from 'react-bootstrap';

// component
class Header extends PureComponent {
   constructor() {
     super();
     this.state = {
         showOverlay: true
     }
    }

  get path () {
    return this.props.path;
  }

  toggle = () => {
    this.props.changeState(!this.props.showSidebar);
    if (this.state.showOverlay) this.setState({showOverlay: false});
  };

  render () {
    return (
      <header>
        <Redirect to={this.path} />
            <div className='logo' >
                <Overlay
                    style={{backgroundColor: 'white'}}
                    ref={(overlay) => this.overlay = overlay}
                    show={this.state.showOverlay}
                    target={() => this.target}
                    placement="right">
                    <Tooltip>
                        {'<'}= Check it out!
                    </Tooltip>
                </Overlay>
                <a ref={text => {
                    this.target = text;
                }} onClick={this.toggle}>LOGO</a>
            </div>
        <nav>
          <ul>
            <li className='first'>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/Products'>Products</Link>
            </li>
            <li className='last'>
              <Link to='/Example'>Testpage</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

function mapStateToProps (state) {
  return {
    path: state.actions.path,
    showSidebar: state.actions.showSidebar
  };
}

Header.propTypes = {
  changeState: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { changeState })(Header);
