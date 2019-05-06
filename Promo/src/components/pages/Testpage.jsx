import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
};

export class Link extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter = () => {
    this.setState({class: STATUS.HOVERED});
  };

  _onMouseLeave = () => {
    this.setState({class: STATUS.NORMAL});
  };

  render () {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        blahblahblah
      </a>
    );
  }
}

export class Checkbox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isChecked: false
        };
    }

    onChange = () => {
        this.setState(prevState => ({isChecked: !prevState.isChecked}));
    };

    render () {
        return (
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.isChecked}
                        onChange={this.onChange}
                    />
                    {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
                </label>
        );
    }
}
