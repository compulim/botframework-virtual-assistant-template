import { css } from 'glamor';
import React, { Component } from 'react';

import Chat from './UI/Chat';
import DashboardControls from './UI/DashboardControls';

const ROOT_CSS = css({
  backgroundColor: '#EEE',
  display: 'grid',
  gridGap: 10,
  gridTemplateColumns: 'auto minmax(200px, 25%)',
  height: 'calc(100% - 20px)',
  padding: 10,
  width: 'calc(100% - 20px)',

  '& > .va__chat': {
    display: 'flex',
    gridColumn: 1,
    overflowY: 'auto'
  },

  '& > .va__controls': {
    backgroundColor: 'White',
    display: 'flex',
    gridColumn: 2
  }
});

class App extends Component {
  render() {
    return (
      <div className={ ROOT_CSS }>
        <Chat className="va__chat" />
        <div className="va__controls">
          <DashboardControls />
        </div>
      </div>
    );
  }
}

export default App;
