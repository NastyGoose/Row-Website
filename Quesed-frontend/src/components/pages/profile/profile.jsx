import React, { Component } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Page } from '../../../assets/styles';
import EditProfileForm from './editProfileForm';
import Achievement from './achievement';
import { getUser, editUser } from '../../../services/userService';

const ProfileSection = styled.section`
  border-right: solid 1px;
  padding-right: 10px;
  margin-right: 10px;
`;

const ProfileTitle = styled.div`
  display: flex;
  align-items: flex-end;
`;

const AchievementsSection = styled.section`
  border-top: solid 1px;
  margin-top: 10px;
`;

const DataSection = styled.section`
  margin-bottom: 10px;
`;

const AchievementTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileArticle = styled.article`
  display: flex;
  align-items: flex-start;
`;

const EditSection = styled.section`
  width: 100%;
`;

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
  },
});

class Profile extends Component {
  state = {
    name: '',
    email: '',
    mineTestsCount: 0,
    visitedTestsCount: 0,
    likedTestsCount: 0,
    dislikedTestsCount: 0,
    answeredTestsCount: 0,
    answeredCorrectlyTestsCount: 0,
  };

  componentDidMount = () => {
    this.populateUser();
  };

  populateUser = async () => {
    const { id: userId } = this.props.match.params;
    if (!userId) {
      const { data: user } = await getUser('profile');
      this.setUserData(user);
      return;
    }

    const { data: user } = await getUser(userId);
    this.setUserData(user);
  };

  setUserData = (user) => {
    const mineTestsCount = user.tests.filter(test => test.isMine).length;
    const visitedTestsCount = user.tests.filter(test => test.isVisited).length;
    const likedTestsCount = user.tests.filter(test => test.isLiked).length;
    const dislikedTestsCount = user.tests.filter(test => test.isDisliked).length;
    const answeredTestsCount = user.tests.filter(test => test.answer.isAnswered).length;
    const answeredCorrectlyTestsCount = user.tests.filter(test => test.answer.isAnsweredCorrectly)
      .length;

    this.setState({
      name: user.name,
      email: user.email,
      mineTestsCount,
      visitedTestsCount,
      likedTestsCount,
      dislikedTestsCount,
      answeredTestsCount,
      answeredCorrectlyTestsCount,
    });
  };

  handleSubmit = (data) => {
    if (this.props.email !== this.state.email) {
      return;
    }
    editUser('profile', { ...data, email: this.state.email });
    this.populateUser();
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      email,
      mineTestsCount,
      visitedTestsCount,
      likedTestsCount,
      dislikedTestsCount,
      answeredTestsCount,
      answeredCorrectlyTestsCount,
    } = this.state;

    return (
      <Page>
        <Paper className={classes.root} elevation={1}>
          <ProfileArticle>
            <ProfileSection>
              <DataSection>
                <ProfileTitle>
                  <Typography variant="h4" component="h2">
                    Profile
                  </Typography>
                </ProfileTitle>
                <Typography component="p">{`Name: ${name}`}</Typography>
                <Typography component="p">{`Login: ${email}`}</Typography>
              </DataSection>
              <AchievementsSection>
                <AchievementTitle>Achievements:</AchievementTitle>
                <AchievementsList>
                  <Achievement icon="plus" label={`${mineTestsCount} tests created`} />
                  <Achievement icon="eye" label={`${visitedTestsCount} tests visited`} />
                  <Achievement icon="thumbs-up" label={`${likedTestsCount} tests liked`} />
                  <Achievement icon="thumbs-down" label={`${dislikedTestsCount} tests disliked`} />
                  <Achievement icon="check" label={`${answeredTestsCount} tests answered`} />
                  <Achievement
                    icon="check-double"
                    label={`${answeredCorrectlyTestsCount} tests answered correctly`}
                  />
                </AchievementsList>
              </AchievementsSection>
            </ProfileSection>
            <EditSection>
              <Typography variant="h4" component="h4">
                Edit Profile
              </Typography>
              <EditProfileForm onSubmit={this.handleSubmit} />
            </EditSection>
          </ProfileArticle>
        </Paper>
      </Page>
    );
  }
}

export default withStyles(styles)(Profile);
