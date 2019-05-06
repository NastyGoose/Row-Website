import React, { Component } from 'react';
import { Page } from '../../assets/styles/index';
import TestForm from '../forms/testForm';
import { saveTest } from '../../services/editorService';
import actionTypes from '../../types/userActionTypes';

class Editor extends Component {
  handleSubmit = (data) => {
    const test = { ...data };
    test.answers = [test.firstAnswer, test.secondAnswer, test.thirdAnswer, test.fourthAnswer];
    delete test.firstAnswer;
    delete test.secondAnswer;
    delete test.thirdAnswer;
    delete test.fourthAnswer;
    saveTest({ ...test, _id: this.props.match.params.id });
    if (actionTypes.CREATEandCHANGE_TESTS & this.props.permission) {
      this.props.history.push('/tests');
    }
  };

  render() {
    return (
      <Page narrow>
        <h2>Editor</h2>
        <TestForm onSubmit={this.handleSubmit} testId={this.props.match.params.id} />
      </Page>
    );
  }
}

export default Editor;
