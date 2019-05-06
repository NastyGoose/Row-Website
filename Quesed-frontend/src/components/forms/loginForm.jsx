import React, { Component } from 'react';
import Joi from 'joi-browser';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const loginSchema = Joi.string()
  .min(6)
  .max(256)
  .required()
  .label('Login');

const passwordSchema = Joi.string()
  .min(6)
  .max(256)
  .required()
  .label('Password');

const schema = {
  login: loginSchema,
  password: passwordSchema,
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
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
});

class LoginForm extends Component {
  state = {
    errors: {},
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
      login: elements.login.value,
      password: elements.password.value,
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

  renderInput = (name, label, placeholder = '', type = 'text') => {
    const { errors } = this.state;
    return (
      <TextField
        error={!!errors && !!errors[name]}
        name={name}
        label={(errors && errors[name]) || label}
        placeholder={placeholder}
        fullWidth
        margin="normal"
        type={type}
      />
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        {this.renderInput('login', 'Login', 'Enter your login')}
        {this.renderInput('password', 'Password', 'Enter your password', 'password')}
        <Button type="submit" variant="contained" className={classes.button}>
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
