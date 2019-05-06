import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteCell from './deleteCell';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class PatchTestsTable extends PureComponent {
  handleDelete = (data) => {
    this.props.onDeleteTestFromPatch(data);
  };

  render() {
    const { classes, data, isReleased } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Likes</TableCell>
              <TableCell align="right">Dislikes</TableCell>
              <TableCell align="right">Visits</TableCell>
              <TableCell align="right">Number Of Replied</TableCell>
              <TableCell align="right">Is Verified</TableCell>
              <TableCell align="right">Author</TableCell>
              {!isReleased && <TableCell align="right" />}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              && data.map(item => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {item.question}
                  </TableCell>
                  <TableCell align="right">{item.likes}</TableCell>
                  <TableCell align="right">{item.dislikes}</TableCell>
                  <TableCell align="right">{item.visits}</TableCell>
                  <TableCell align="right">{item.numberOfReplied}</TableCell>
                  <TableCell align="right">
                    {item.verified ? (
                      <FontAwesomeIcon color="green" icon="check" />
                    ) : (
                      <FontAwesomeIcon color="red" icon="times" />
                    )}
                  </TableCell>
                  <TableCell align="right">{item.author.name}</TableCell>
                  {!isReleased && <DeleteCell onDelete={this.handleDelete} itemId={item._id} />}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(PatchTestsTable);
