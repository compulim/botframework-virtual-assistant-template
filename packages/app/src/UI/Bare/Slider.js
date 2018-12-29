import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

const ROOT_CSS = css({
  alignItems: 'center',
  display: 'flex',
  height: 30,
  position: 'relative',
  touchAction: 'none',
  userSelect: 'none',

  '& > .va__handlerbox': {
    cursor: 'pointer',
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: 'calc(100% - 15px)',

    '& > .va__handler': {
      backgroundColor: '#EEE',
      border: 'solid 2px #666',
      boxSizing: 'border-box',
      height: '100%',
      width: 15
    },

    '& > .va__jumper.va__jumper--right': {
      flex: 1,
      marginRight: -15
    }
  },

  '& > .va__track': {
    borderTop : 'solid 2px #999',
    width: '100%'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();

    this.handleLeftJumperClick = this.handleJumperClick.bind(this, value => value - .1);
    this.handleRightJumperClick = this.handleJumperClick.bind(this, value => value + .1);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);

    this.state = {
      currentPointerID: null
    };
  }

  getValue(clientX) {
    const { anchorClientX, anchorValue } = this.state;
    const { current } = this.rootRef;
    const deltaXFraction = (clientX - anchorClientX) / current.offsetWidth;

    return Math.min(1, Math.max(0, anchorValue + deltaXFraction));
  }

  handleJumperClick(updater) {
    const { value } = this.props;

    this.props.onChange && this.props.onChange(Math.min(1, Math.max(0, updater(value))));
  }

  handlePointerDown({ clientX, pointerId, target }) {
    this.setState(({ currentPointerID }) => {
      if (!currentPointerID) {
        target.setPointerCapture(pointerId);

        return {
          anchorClientX: clientX,
          anchorValue: this.props.value,
          currentPointerID: pointerId
        };
      }
    });
  }

  handlePointerMove({ clientX, pointerId }) {
    const { current } = this.rootRef;

    if (current && pointerId === this.state.currentPointerID) {
      const nextValue = this.getValue(clientX);

      this.props.onChanging && this.props.onChanging(nextValue);
    }
  }

  handlePointerUp({ clientX, pointerId, target }) {
    if (pointerId === this.state.currentPointerID) {
      const nextValue = this.getValue(clientX);

      this.props.onChange && this.props.onChange(nextValue);
    }

    this.setState(({ currentPointerID }) => {
      if (currentPointerID === pointerId) {
        target.releasePointerCapture(pointerId);

        return {
          anchorClientX: null,
          anchorValue: null,
          currentPointerID: null
        };
      }
    });
  }

  render() {
    const {
      props: { className, value },
    } = this;

    return (
      <div
        className={ classNames(
          ROOT_CSS + '',
          (className || '') + ''
        ) }
        ref={ this.rootRef }
      >
        <div className="va__handlerbox">
          <div
            className="va__jumper"
            onClick={ this.handleLeftJumperClick }
            style={{ width: (value || 0) * 100 + '%' }}
          />
          <div
            className="va__handler"
            onPointerDown={ this.handlePointerDown }
            onPointerMove={ this.handlePointerMove }
            onPointerUp={ this.handlePointerUp }
          />
          <div
            className="va__jumper va__jumper--right"
            onClick={ this.handleRightJumperClick }
          />
        </div>
        <div className="va__track" />
      </div>
    );
  }
}
