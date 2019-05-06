import React, { Component } from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Answer from '../common/answer';
import { viewTest, answerTest, likeDislikeTest, verifyTest } from '../../services/testService';
import { Page } from '../../assets/styles/index';
import actionTypes from '../../types/userActionTypes';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VerifyIcon = styled(FontAwesomeIcon).attrs(({ verified }) => ({
  icon: 'clipboard-check',
  size: '2x',
  color: verified === 'true' ? 'green' : '',
}))`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;

const Rate = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const Like = styled(FontAwesomeIcon).attrs({
  icon: 'thumbs-up',
})`
  color: ${({ isliked }) => (isliked === 'true' ? 'green' : '')};
  margin: 20px;
  cursor: pointer;
  transition: 0.3s;
`;

const Dislike = styled(FontAwesomeIcon).attrs({
  icon: 'thumbs-down',
})`
  color: ${({ isdisliked }) => (isdisliked === 'true' ? 'red' : '')};
  margin: 20px;
  cursor: pointer;
  transition: 0.3s;
`;

const AchievementsSection = styled.section`
  border-left: solid 1px;
  padding-left: 10px;
  margin-left: 10px;
`;

const AchievementTitle = styled.h3`
  margin-bottom: 10px;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AchievementIcon = styled(FontAwesomeIcon).attrs(({ icon }) => ({
  icon,
}))`
  margin: 5px 0 5px 0;
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
  chip: {
    margin: theme.spacing.unit,
  },
});

// q2f2feefef3f4 q2f2fee25f3f4
class TestPage extends Component {
  state = {
    test: {},
    isAnswered: false,
    isDescriptionShowed: false,
  };

  componentDidMount = () => {
    this.populateTest();
  };

  populateTest = async (id) => {
    const { id: testId } = this.props.match.params;
    const { data } = await viewTest(id || testId);
    if (id === 'random') {
      this.props.history.push(`/tests/${data.test._id}`);
    }
    const test = this.mapToModelView(data);
    this.setState({ test, isAnswered: false, isDescriptionShowed: false });
  };

  mapToModelView = test => ({
    author: test.test.author.name,
    answers: test.test.answers,
    likes: test.test.likes,
    dislikes: test.test.dislikes,
    views: test.test.visits,
    verified: test.test.verified,
    question: test.test.question,
    description: test.test.description,
    id: test.test._id,
    isAnswered: test.result ? test.result.answer.isAnswered : false,
    isAnsweredCorrectly: test.result ? test.result.answer.isAnsweredCorrectly : false,
    isDisliked: test.result ? test.result.isDisliked : false,
    isLiked: test.result ? test.result.isLiked : false,
    isVisited: test.result ? test.result.isVisited : false,
  });

  handleAnswer = (id) => {
    if (!(this.props.permission & actionTypes.ANSWER_TEST)) {
      return;
    }
    answerTest(this.state.test.id, id);
    this.setState({ isAnswered: true, isDescriptionShowed: true });
  };

  handleLike = () => {
    if (this.props.permission <= actionTypes.RATE_TESTS) {
      return;
    }
    likeDislikeTest(this.state.test.id, 'like');
    this.setState((state) => {
      if (state.test.isLiked) {
        return {
          test: {
            ...state.test,
            isLiked: false,
            isDisliked: false,
            likes: state.test.likes - 1,
          },
        };
      }

      if (state.test.isDisliked) {
        return {
          test: {
            ...state.test,
            isLiked: true,
            isDisliked: false,
            likes: state.test.likes + 1,
            dislikes: state.test.dislikes - 1,
          },
        };
      }

      return {
        test: {
          ...state.test,
          isLiked: true,
          isDisliked: false,
          likes: state.test.likes + 1,
        },
      };
    });
  };

  handleDislike = () => {
    if (!(this.props.permission & actionTypes.RATE_TESTS)) {
      return;
    }
    likeDislikeTest(this.state.test.id, 'dislike');
    this.setState((state) => {
      if (state.test.isDisliked) {
        return {
          test: {
            ...state.test,
            isLiked: false,
            isDisliked: false,
            dislikes: state.test.dislikes - 1,
          },
        };
      }

      if (state.test.isLiked) {
        return {
          test: {
            ...state.test,
            isLiked: false,
            isDisliked: true,
            likes: state.test.likes - 1,
            dislikes: state.test.dislikes + 1,
          },
        };
      }

      return {
        test: {
          ...state.test,
          isLiked: false,
          isDisliked: true,
          dislikes: state.test.dislikes + 1,
        },
      };
    });
  };

  handleNextQuestion = () => {
    this.populateTest('random');
  };

  handleVerify = () => {
    if (!(this.props.permission & actionTypes.VERIFY_TESTS)) {
      return;
    }
    this.setState((state) => {
      if (state.test.verified) {
        verifyTest(state.test.id, 'unverify');
        return {
          test: {
            ...state.test,
            verified: false,
          },
        };
      }
      if (!state.test.verified) {
        verifyTest(state.test.id, 'verify');
        return {
          test: {
            ...state.test,
            verified: true,
          },
        };
      }
      return state;
    });
  };

  render() {
    const { test, isAnswered, isDescriptionShowed } = this.state;
    const { classes } = this.props;

    return (
      <Page>
        <Paper className={classes.root} elevation={1}>
          <Container>
            <div>
              <VerifyIcon verified={test.verified ? 'true' : 'false'} onClick={this.handleVerify} />
              <Typography variant="h5" component="h3">
                {test.question}
              </Typography>
              <Typography component="div">
                {!isEmpty(test) && test.answers
                  && test.answers.map((answer, index) => (
                    <Answer
                      key={answer._id}
                      answer={answer}
                      index={index}
                      onAnswer={this.handleAnswer}
                      isAnswered={isAnswered}
                    />
                  ))}
              </Typography>
              {isAnswered && (
                <Button
                  onClick={this.handleNextQuestion}
                  variant="contained"
                  className={classes.button}
                >
                  {'Next question'}
                </Button>
              )}
              <Collapse in={isDescriptionShowed}>{test.description}</Collapse>
              <Rate>
                <Typography variant="h5" component="div">
                  <Rate>
                    <Like
                      onClick={this.handleLike}
                      isliked={test.isLiked !== undefined ? test.isLiked.toString() : ''}
                      size="lg"
                    />
                    {test.likes}
                  </Rate>
                </Typography>

                <Typography variant="h5" component="div">
                  <Rate>
                    <Dislike
                      onClick={this.handleDislike}
                      isdisliked={test.isDisliked !== undefined ? test.isDisliked.toString() : ''}
                      size="lg"
                    />
                    {test.dislikes}
                  </Rate>
                </Typography>
              </Rate>
              <Typography component="p">{`Author: ${test.author}`}</Typography>
              <Typography component="p">{`${test.views} views`}</Typography>
            </div>
            <AchievementsSection>
              <AchievementTitle>Achivments:</AchievementTitle>
              <AchievementsList>
                {test.isAnswered && (
                  <Chip
                    avatar={(
                      <Avatar>
                        <AchievementIcon icon="check" />
                      </Avatar>
)}
                    label="Answered"
                    className={classes.chip}
                  />
                )}

                {test.isVisited && (
                  <Chip
                    avatar={(
                      <Avatar>
                        <AchievementIcon icon="eye" />
                      </Avatar>
)}
                    label="Visited before"
                    className={classes.chip}
                  />
                )}

                {test.isAnsweredCorrectly && (
                  <Chip
                    avatar={(
                      <Avatar>
                        <AchievementIcon icon="check-double" />
                      </Avatar>
)}
                    label="Answered correctly"
                    className={classes.chip}
                  />
                )}
              </AchievementsList>
            </AchievementsSection>
          </Container>
        </Paper>
      </Page>
    );
  }
}

export default withStyles(styles)(TestPage);
