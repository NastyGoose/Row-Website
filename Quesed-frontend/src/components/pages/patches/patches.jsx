import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { Page } from '../../../assets/styles';
import PatchesTable from './patchesTable';
import { getPatches } from '../../../services/patchService';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  page: {
    position: 'relative',
  },
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

class Patches extends Component {
  state = {
    patches: [],
    anchorEl: null,
    open: false,
  };

  componentDidMount() {
    this.populatePatches();
  }

  populatePatches = async () => {
    const { data: patches } = await getPatches();
    this.setState({ patches });
  };

  handleAddPatch = (event) => {
    if (this.state.patches.find(patch => !patch.dateRelease)) {
      const { currentTarget } = event;
      this.setState({
        anchorEl: currentTarget,
        open: true,
      });
      setTimeout(() => {
        this.setState({
          anchorEl: currentTarget,
          open: false,
        });
      }, 4000);
      return;
    }

    this.props.history.push('/patch-editor');
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open, patches } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <Page className={classes.page}>
        <Button
          onClick={this.handleAddPatch}
          variant="contained"
          color="default"
          className={classes.button}
        >
          Create new patch
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography className={classes.typography}>Release all patches first</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <h2>Patches</h2>
        <PatchesTable data={patches} />
      </Page>
    );
  }
}

export default withStyles(styles)(Patches);
