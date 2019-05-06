import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Page } from '../../../assets/styles';
import UsersTable from './usersTable';
import { getUsers } from '../../../services/userService';
import { changeUserType } from '../../../services/adminServices';
import userTypes from '../../../types/userTypes';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Users extends Component {
  state = {
    users: [],
    userPermission: {},
  };

  async componentDidMount() {
    const userPermission = {};
    const { data: users } = await getUsers();
    users.forEach((item) => {
      userPermission[item._id] = item.permission;
    });

    this.setState({ users, userPermission });
  }

  getUserType = (permission) => {
    const {
      guest, user, moderator, admin,
    } = userTypes;
    switch (true) {
      case permission <= guest:
        return 'guest';
      case permission <= user:
        return 'user';
      case permission <= moderator:
        return 'moderator';
      case permission <= admin:
        return 'admin';
      default:
        return 'guest';
    }
  };

  handleSelectUserType = ({ target: input }) => {
    this.setState((state) => {
      const userPermission = { ...state.userPermission };
      userPermission[input.name] = input.value;
      return { userPermission };
    });
    this.handleChangeUserType(input.name, input.value);
  };

  handleChangeUserType = async (id, permission) => {
    await changeUserType(id, this.getUserType(permission));
  };

  render() {
    const { users, userPermission } = this.state;

    return (
      <Page>
        <h2>Users</h2>
        {users.length && (
          <UsersTable
            onSubmit={this.handleSubmit}
            onSelectUserType={this.handleSelectUserType}
            data={users}
            userPermission={userPermission}
            getUserType={this.getUserType}
          />
        )}
      </Page>
    );
  }
}

export default withStyles(styles)(Users);
