import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class DeleteCell extends PureComponent {
  handleDelete = () => {
    this.props.onDelete(this.props.itemId);
  };

  render() {
    const { classes } = this.props;

    return (
      <TableCell align="right">
        <Button
          onClick={this.handleDelete}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Delete
          <DeleteIcon className={classes.rightIcon} />
        </Button>
      </TableCell>
    );
  }
}

export default withStyles(styles)(DeleteCell);
