import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import userTypes from '../../../types/userTypes';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    marginLeft: 0,
  },
  selectEmpty: {
    marginTop: 0,
  },
});

const UsersTable = ({
  classes, data, onSelectUserType, userPermission, getUserType,
}) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Login</TableCell>
          <TableCell>Role</TableCell>
          <TableCell align="right">Answers</TableCell>
          <TableCell align="right">Correct Answers</TableCell>
          <TableCell align="right">Created tests</TableCell>
          <TableCell align="right">Likes</TableCell>
          <TableCell align="right">Dislikes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(item => (
          <TableRow key={item._id}>
            <TableCell component="th" scope="row">
              <Link to={`users/${item._id}`}>{item.name}</Link>
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              {userTypes.admin !== userPermission[item._id] ? (
                <FormControl className={classes.formControl}>
                  <Select
                    value={userPermission[item._id]}
                    onChange={onSelectUserType}
                    displayEmpty
                    name={item._id}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value={userTypes.user}>{getUserType(userTypes.user)}</MenuItem>
                    <MenuItem value={userTypes.moderator}>
                      {getUserType(userTypes.moderator)}
                    </MenuItem>
                  </Select>
                </FormControl>
              ) : (
                getUserType(userTypes.admin)
              )}
            </TableCell>
            <TableCell align="right">
              {item.tests.filter(test => test.answer.isAnswered).length}
            </TableCell>
            <TableCell align="right">
              {item.tests.filter(test => test.answer.isAnsweredCorrectly).length}
            </TableCell>
            <TableCell align="right">{item.tests.filter(test => test.isMine).length}</TableCell>
            <TableCell align="right">{item.tests.filter(test => test.isLiked).length}</TableCell>
            <TableCell align="right">{item.tests.filter(test => test.isDisliked).length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default withStyles(styles)(UsersTable);
