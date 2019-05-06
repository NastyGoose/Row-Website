import React, { Component } from 'react';
import Joi from 'joi-browser';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const nameSchema = Joi.string()
  .min(6)
  .max(256)
  .required()
  .label('Name');

const passwordSchema = Joi.string()
  .min(6)
  .max(256)
  .required()
  .label('Password');

const repeatPasswordSchema = Joi.string()
  .valid(Joi.ref('password'))
  .required()
  .label('Password');

const schema = {
  name: nameSchema,
  password: passwordSchema,
  repeatPassword: repeatPasswordSchema,
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

class EditProfileForm extends Component {
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
      name: elements.name.value,
      password: elements.password.value,
      repeatPassword: elements.repeatPassword.value,
    };

    const errors = this.validate(data);
    this.setErrors(errors);
    if (errors) {
      return;
    }
    delete data.repeatPassword;

    this.props.onSubmit(data);
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ [input.name]: input.value });
  };

  setErrors = (errors) => {
    const newErrors = { ...errors };
    if (newErrors && newErrors.repeatPassword) {
      newErrors.repeatPassword = '"Repeat Password" should be same as "Password"';
    }
    this.setState({ errors: newErrors });
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
        {this.renderInput('name', 'Name', 'Enter your name')}
        {this.renderInput('password', 'Password', 'Enter your password', 'password')}
        {this.renderInput('repeatPassword', 'Repeat Password', 'Repeat your password', 'password')}
        <Button type="submit" className={classes.button} variant="contained">
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(EditProfileForm);
