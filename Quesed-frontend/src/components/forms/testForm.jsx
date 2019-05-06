import React, { Component } from 'react';
import styled from 'styled-components';
import Joi from 'joi-browser';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { getTest } from '../../services/editorService';

const questionSchema = Joi.string()
  .min(6)
  .max(256)
  .required()
  .label('Question');

const answerSchema = Joi.object().keys({
  answer: Joi.string()
    .required()
    .label('Answer'),
  isCorrect: Joi.boolean(),
});

const descriptionSchema = Joi.string()
  .allow('')
  .label('Description');

const schema = {
  question: questionSchema,
  firstAnswer: answerSchema,
  secondAnswer: answerSchema,
  thirdAnswer: answerSchema,
  fourthAnswer: answerSchema,
  description: descriptionSchema,
};

const AnswerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  radio: {
    marginTop: '24px',
  },
  radioGroup: {
    width: '100%',
  },
  checked: {},
});

class TestForm extends Component {
  state = {
    question: '',
    description: '',
    firstAnswer: '',
    secondAnswer: '',
    thirdAnswer: '',
    fourthAnswer: '',
    selectedValue: 'firstAnswerRadio',
    errors: {},
  };

  componentDidMount = () => {
    this.populateTest();
  };

  populateTest = async () => {
    if (!this.props.testId) {
      return;
    }

    const { data: test } = await getTest(this.props.testId);
    if (!test) {
      return;
    }

    const correctAnswer = test.answers.find(answer => answer.isCorrect === true);
    const index = test.answers.indexOf(correctAnswer);
    let selectedValue;
    switch (index) {
      case 0:
        selectedValue = 'firstAnswerRadio';
        break;
      case 1:
        selectedValue = 'secondAnswerRadio';
        break;
      case 2:
        selectedValue = 'thirdAnswerRadio';
        break;
      case 3:
        selectedValue = 'fourthAnswerRadio';
        break;
      default:
        selectedValue = 'firstAnswerRadio';
    }

    this.setState({
      question: test.question,
      description: test.description ? test.description : '',
      firstAnswer: test.answers[0].answer,
      secondAnswer: test.answers[1].answer,
      thirdAnswer: test.answers[2].answer,
      fourthAnswer: test.answers[3].answer,
      selectedValue,
    });
  };

  handleRadioSelect = (event) => {
    this.setState({ selectedValue: event.target.value });
  };

  validate = (data) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) {
      return null;
    }

    const errors = {};
    error.details.forEach((item) => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { elements } = event.target;
    const data = {
      question: elements.question.value,
      firstAnswer: {
        answer: elements.firstAnswer.value,
        isCorrect: elements.firstAnswerRadio.checked,
      },
      secondAnswer: {
        answer: elements.secondAnswer.value,
        isCorrect: elements.secondAnswerRadio.checked,
      },
      thirdAnswer: {
        answer: elements.thirdAnswer.value,
        isCorrect: elements.thirdAnswerRadio.checked,
      },
      fourthAnswer: {
        answer: elements.fourthAnswer.value,
        isCorrect: elements.fourthAnswerRadio.checked,
      },
      description: elements.description.value,
    };

    const errors = this.validate(data);
    this.setErrors(errors);
    if (errors) {
      return;
    }

    this.props.onSubmit(data);
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ [input.name]: input.value });
  };

  setErrors = (errors) => {
    this.setState({ errors });
  };

  render() {
    const { classes } = this.props;
    const {
      question,
      description,
      firstAnswer,
      secondAnswer,
      thirdAnswer,
      fourthAnswer,
      selectedValue,
      errors,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          error={!!errors && !!errors.question}
          name="question"
          value={question}
          label={(errors && errors.question) || 'Question'}
          placeholder="Enter question"
          fullWidth
          margin="normal"
          onChange={this.handleChange}
        />
        <RadioGroup name="answers" className={classes.radioGroup}>
          <AnswerContainer>
            <Radio
              onChange={this.handleRadioSelect}
              checked={selectedValue === 'firstAnswerRadio'}
              className={classes.radio}
              name="firstAnswerRadio"
              value="firstAnswerRadio"
            />
            <TextField
              error={!!errors && !!errors.firstAnswer}
              name="firstAnswer"
              value={firstAnswer}
              label={(errors && errors.firstAnswer) || 'First answer'}
              placeholder="Enter answer"
              fullWidth
              margin="normal"
              onChange={this.handleChange}
            />
          </AnswerContainer>

          <AnswerContainer>
            <Radio
              onChange={this.handleRadioSelect}
              checked={selectedValue === 'secondAnswerRadio'}
              className={classes.radio}
              name="secondAnswerRadio"
              value="secondAnswerRadio"
            />
            <TextField
              error={!!errors && !!errors.secondAnswer}
              name="secondAnswer"
              value={secondAnswer}
              label={(errors && errors.secondAnswer) || 'Second answer'}
              placeholder="Enter answer"
              fullWidth
              margin="normal"
              onChange={this.handleChange}
            />
          </AnswerContainer>

          <AnswerContainer>
            <Radio
              onChange={this.handleRadioSelect}
              checked={selectedValue === 'thirdAnswerRadio'}
              className={classes.radio}
              name="thirdAnswerRadio"
              value="thirdAnswerRadio"
            />
            <TextField
              error={!!errors && !!errors.thirdAnswer}
              name="thirdAnswer"
              value={thirdAnswer}
              label={(errors && errors.thirdAnswer) || 'Third answer'}
              placeholder="Enter answer"
              fullWidth
              margin="normal"
              onChange={this.handleChange}
            />
          </AnswerContainer>

          <AnswerContainer>
            <Radio
              onChange={this.handleRadioSelect}
              checked={selectedValue === 'fourthAnswerRadio'}
              className={classes.radio}
              name="fourthAnswerRadio"
              value="fourthAnswerRadio"
            />
            <TextField
              error={!!errors && !!errors.fourthAnswer}
              name="fourthAnswer"
              value={fourthAnswer}
              label={(errors && errors.fourthAnswer) || 'Fourth answer'}
              placeholder="Enter answer"
              fullWidth
              margin="normal"
              onChange={this.handleChange}
            />
          </AnswerContainer>
        </RadioGroup>
        <TextField
          error={!!errors && !!errors.description}
          name="description"
          value={description}
          label={(errors && errors.description) || 'Description'}
          placeholder="Enter description"
          fullWidth
          margin="normal"
          onChange={this.handleChange}
        />
        <Button type="submit" variant="contained" className={classes.button}>
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(TestForm);
