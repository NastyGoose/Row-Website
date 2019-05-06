import React, { Component } from 'react';
import Joi from 'joi-browser';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const patchTypeSchema = Joi.string()
  .valid('fix', 'add', 'new')
  .required()
  .label('Path Type');

const descriptionSchema = Joi.string()
  .min(6)
  .max(256)
  .required()
  .label('Description');

const schema = {
  patchType: patchTypeSchema,
  description: descriptionSchema,
};

const styles = theme => ({
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
  formControl: {
    minWidth: 120,
  },
});

class PatchForm extends Component {
  state = {
    patchType: '',
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
      patchType: this.state.patchType,
      description: elements.description.value,
    };

    const errors = this.validate(data);
    this.setErrors(errors);
    if (errors) {
      return;
    }

    this.props.onSubmit(data);
  };

  handleChange = ({ target: input }) => {
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
    const { errors, patchType } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <FormControl error={errors && !!errors.patchType} className={classes.formControl}>
          <InputLabel htmlFor="patch-type">Patch type</InputLabel>
          <Select
            value={patchType}
            onChange={this.handleChange}
            name="patchType"
            input={<Input id="patch-type" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="fix">Fix</MenuItem>
            <MenuItem value="add">Add</MenuItem>
            <MenuItem value="new">New</MenuItem>
          </Select>
          {errors && errors.patchType && <FormHelperText>{errors.patchType}</FormHelperText>}
        </FormControl>
        {this.renderInput('description', 'Description', 'Enter description')}
        <Button type="submit" variant="contained" className={classes.button}>
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(PatchForm);
