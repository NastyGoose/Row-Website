import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Page } from '../../../assets/styles';
import PatchTestsTable from './patchTestsTable';
import { getPatch, releasePatch, deleteTestFromPatch } from '../../../services/patchService';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    position: 'relative',
    color: 'black',
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Patch extends Component {
  state = {
    patch: {},
  };

  componentDidMount() {
    this.populatePatch();
  }

  populatePatch = async () => {
    const { id: patchId } = this.props.match.params;
    const { data: patch } = await getPatch(patchId);
    if (!patch) {
      return;
    }
    this.setState({ patch });
  };

  handleRelease = async () => {
    await releasePatch(this.state.patch.description);
    this.props.history.push('/patches');
  };

  handleDeleteTestFromPatch = async (id) => {
    await deleteTestFromPatch(id);
    this.setState((state) => {
      const tests = state.patch.tests.filter(test => test._id !== id);
      const patch = { ...state.patch, tests };
      return { patch };
    });
  };

  render() {
    const { patch } = this.state;
    const { classes } = this.props;

    return (
      <Page>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h4" component="h2">
            Patch
          </Typography>

          <div>{`Name: ${patch.name}`}</div>
          <div>{`Description: ${patch.description}`}</div>
          <div>{`Creation Date: ${patch.dateCreation}`}</div>
          {patch.dateRelease && <div>{`Release Date: ${patch.dateRelease}`}</div>}
          {patch.tests && <div>{`Patch tests count: ${patch.tests.length}`}</div>}

          <Button
            onClick={this.handleRelease}
            variant="contained"
            color="default"
            className={classes.button}
          >
            Release
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        </Paper>
        <PatchTestsTable
          onDeleteTestFromPatch={this.handleDeleteTestFromPatch}
          data={patch.tests}
          isReleased={patch.dateRelease}
        />
      </Page>
    );
  }
}

export default withStyles(styles)(Patch);
