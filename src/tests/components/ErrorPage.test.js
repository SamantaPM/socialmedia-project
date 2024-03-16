import React from 'react';
import { create } from 'react-test-renderer';
import ErrorPage from '../../components/ErrorPage';
import MainLayout from '../../layouts/MainLayout';
import { renderWithRouter } from '../utils/renderWithRouter';

console.error = jest.fn();
console.warn = jest.fn();
const routes = {
  path: '/',
  element: <MainLayout />,
  errorElement: <ErrorPage />
};

beforeEach(() => {
  console.error.mockClear();
  console.warn.mockClear();
});

describe('<ErrorPage /> tests:', () => {
  test('should render <ErrorPage /> correctly', () => {
    const tree = create(renderWithRouter(routes, [], {
      initialEntries: ['/', '/sdawdfa'],
      initialIndex: 1
    }, true)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render console warn message', () => {
    renderWithRouter(routes, [], {
      initialEntries: ['/', '/sdawdfa'],
      initialIndex: 1
    });

    expect(console.warn).toHaveBeenCalledWith('No routes matched location \"/sdawdfa\" ');
  });
});
