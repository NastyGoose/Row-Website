import React from 'react';
import { Link, Checkbox } from '../components/pages/Testpage';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page='http://www.facebook.com'>Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<Checkbox labelOn='On' labelOff='Off' />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
