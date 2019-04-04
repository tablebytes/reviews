import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App.jsx';
const request = require('supertest');
const Models = require('../database/Models');

describe('Hello world test', () => {
  const wrapper = shallow(<App />);
  test('says hello world', () => {
    expect(wrapper.text()).toEqual('Hello World');
  });
});

describe('Database Test', () => {
  let items;
  test('it contains a reviews table', done => ({
    Models.Review.find()
      .then(results => {
        items = results;
        expect(results).toBeTruthy();
        done();
      })
  }));
});
