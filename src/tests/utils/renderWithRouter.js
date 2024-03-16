import React, { isValidElement } from 'react';
import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
// https://webup.org/blog/how-to-avoid-mocking-in-react-router-v6-tests/
export function renderWithRouter (children, routes = [], initialEntries = false, element = false) {
  const options = isValidElement(children)
    ? { element: children, path: '/' }
    : children;

  initialEntries = (!initialEntries)
    ? ({
        initialEntries: [options.path],
        initialIndex: 1
      })
    : initialEntries;

  const router = createMemoryRouter([{ ...options }, ...routes], initialEntries);

  const routerProvider = <RouterProvider router={router} />;

  return element ? routerProvider : render(routerProvider);
}
