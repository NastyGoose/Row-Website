import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// css
import './assets/css/default.min.css';
import './assets/scss/default.scss';

// components
import Header from './components/headerComponent/header.jsx';
import Footer from './components/footerComponent/footer.jsx';
import Homepage from './components/pages/Homepage.jsx';
import Products from './components/pages/Products.jsx';
import StickyPanel from './components/utilComponents/stickyPanel.jsx';
import Sidebar from './components/utilComponents/sidebar.jsx';
import {Link} from './components/pages/Testpage.jsx';
// animations
import {Power2, TweenLite} from 'gsap';
import { Zoom } from 'react-preloaders';
import { preventDefault } from './components/utilComponents/utilFunctions'

// redux
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore';

const store = configureStore();

class App extends PureComponent {
  constructor () {
    super();
    this.state = {
      delay: 2500,
      loading: true
    };
    setTimeout(() => window.onwheel = null, this.state.delay + 500);
  }

  componentDidMount () {
    //this.scrollToTop();
    window.onwheel = preventDefault;
  }

  scrollToTop () {
    const scrollAnimation = { scrollTop: document.body.scrollHeight };
    const scrollTop = 0;

    const tween = TweenLite.to(scrollAnimation, 5, {
      scrollTop: scrollTop,
      ease: Power2.easeInOut,
      onUpdate: () => {
        window.scrollTo(0, scrollAnimation.scrollTop);
      }
    });

    if (!this.state.loading) {
      window.addEventListener('mousewheel', function mouseHandler () {
        tween.kill();
        window.removeEventListener('mousewheel', mouseHandler, false);
      }, false);
    }
  };

  render () {
    return (
      <Provider store={store}>
        <body>

          <Zoom
            color={'#fffad3'}
            bgColor={'rgb(0, 0, 0, .80)'}
            time={this.state.delay}
          />

          <Router>
            <div className='App'>

              <Header />

              <Sidebar />

              <Route path='/(home|)/'
                component={Homepage}
              />
              <Route
                exact path='/Homepage'
                component={Homepage}
              />

              <Route
                exact path='/Products'
                component={Products}
              />

              <Route
                exact path='/Example'
                component={Link}
                //components={{body: Link, Checkbox}}
              />

              <StickyPanel />

              <Footer ref={(ct) => { this.contacts = ct; }} />

            </div>

          </Router>

        </body>
      </Provider>
    );
  }
}

export default (App);
