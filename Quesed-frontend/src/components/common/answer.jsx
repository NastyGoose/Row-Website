import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Answer extends PureComponent {
  handleAnswer = () => {
    const { onAnswer, answer, isAnswered } = this.props;
    if (isAnswered) {
      return;
    }
    onAnswer(answer._id);
  };

  setButtonColor = () => {
    const { isAnswered, answer } = this.props;
    if (isAnswered) {
      return answer.isCorrect ? 'primary' : 'secondary';
    }
    return 'default';
  };

  render() {
    const { classes, answer, index } = this.props;

    return (
      <Button
        color={this.setButtonColor()}
        onClick={this.handleAnswer}
        variant="contained"
        className={classes.button}
      >
        {`${index + 1}. `}
        {answer.answer}
      </Button>
    );
  }
}

export default withStyles(styles)(Answer);
