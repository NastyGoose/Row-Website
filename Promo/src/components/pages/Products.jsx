import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardBody,
  CardTitle, Button, UncontrolledCarousel} from 'reactstrap';
import Modal from 'react-responsive-modal';
import PropTypes from "prop-types";
import { changeState } from '../../actions/modalStatelAction';

class Products extends PureComponent {

    onOpenModal = (addInfo) => {
        this.props.changeState(addInfo);
    };

    onCloseModal = () => {
        this.props.changeState('');
    };

  get list () {
    return this.props.projects.map((project) => {
      return (
        <li
            className='reduxListItem'
            key={project.id}
        >
          <Card>
            <UncontrolledCarousel items={project.items} />
            <CardBody>
              <CardTitle
                  style={{ marginTop: '0' }}
              >
                  {project.name}
              </CardTitle>
              <CardText>
                  {project.desc}
              </CardText>
              <Button
                  outline color='warning'
                  onClick={() => this.onOpenModal(project.addInfo)}
              >
                  Learn more
              </Button>
            </CardBody>
          </Card>
        </li>
      );
    });
  }

  render () {
    return (
      <div>
          <Modal
              open={this.props.open}
              onClose={this.onCloseModal}
              center
          >
              {this.props.text}
          </Modal>
          <ul className='reduxList'>
                  {this.list}
          </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    projects: state.projects,
    open: state.actions.isOpen,
    text: state.actions.text
  };
}

Products.propTypes = {
    text: PropTypes.string.isRequired,
    changeState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { changeState })(Products);
