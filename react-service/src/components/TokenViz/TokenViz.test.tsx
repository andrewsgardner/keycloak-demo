import React from 'react';
import { render, screen } from '@testing-library/react';
import TokenViz from './TokenViz';

test('renders auth token header text', () => {
  render(<TokenViz />);
  const linkElement = screen.getByText(/auth token/i);
  expect(linkElement).toBeInTheDocument();
});
