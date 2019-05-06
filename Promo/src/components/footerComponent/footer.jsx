import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';

// component
class Footer extends PureComponent {
  render () {
    return (
      <footer>
        <Button
          variant='outlined'
          className='contactBtn'
          href='mailto:Staaalker@tut.by'
        >
              Contact us!
        </Button>
      </footer>
    );
  }
}

export default Footer;
