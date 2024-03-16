import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { create } from 'react-test-renderer';
import { renderWithRouter } from '../utils/renderWithRouter';

const routes = {
  path: '/',
  element: <MainLayout />
};

describe('<MainLayout /> tests:', () => {
  test('should render MainLayout correctly', () => {
    const tree = create(renderWithRouter(routes, [], false, true)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
