import React, { Component } from 'react';
import Grid from '../common/grid';
import TestCard from '../TestCard';
import { getTests } from '../../services/testService';
import { Page } from '../../assets/styles/index';

class TestsPage extends Component {
  state = {
    tests: [],
  };

  async componentDidMount() {
    this.populateTests();
  }

  populateTests = async () => {
    const { data } = await getTests();
    const tests = this.mapToModelView(data);

    this.setState({ tests });
  };

  mapToModelView = tests => tests.tests.map(test => ({
    author: test.author.name,
    likes: test.likes,
    dislikes: test.dislikes,
    views: test.visits,
    verified: test.verified,
    question: test.question,
    isPatched: !!test.patch,
    id: test._id,
  }));

  handleTestCardClick = (id) => {
    this.props.history.push(`tests/${id}`);
  };

  render() {
    const { tests } = this.state;

    return (
      <Page none>
        <Grid
          component={TestCard}
          data={tests}
          onTestCardClick={this.handleTestCardClick}
          permission={this.props.permission}
          login={this.props.login}
          populateTests={this.populateTests}
        />
      </Page>
    );
  }
}

export default TestsPage;
