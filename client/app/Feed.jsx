import withStyles from '@material-ui/core/styles/withStyles';

import CssBaseline from '@material-ui/core/CssBaseline';

import React from 'react';

import SideBarLeft from './feed/SideBarLeft'
import TopBar from './feed/TopBar'
import Content from './feed/Content'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  root: {
    display: 'flex',
  },
});

const Feed = ({classes}) => {

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <SideBarLeft />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content />
      </main>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Feed);

/*

          <Filters 
            filterOrigin={'uploadFilter'}
          >
          </Filters>

import Filters1 from './Filters1.jsx'
import Filters2 from './Filters2.jsx'
import Filter1 from './Filter1.jsx'

        <Filters1>
          <Filter1>
          </Filter1>
        </Filters1>

        <Filters2>
        </Filters2>
*/