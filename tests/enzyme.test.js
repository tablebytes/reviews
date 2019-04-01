import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App.jsx';

describe('Hello world test', () => {
  const wrapper = shallow(<App />);
  test('says hello world', () => {
    expect(wrapper.text()).toEqual('Hello World');
  });
});
