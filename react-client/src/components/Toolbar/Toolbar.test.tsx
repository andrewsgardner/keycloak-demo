import React from 'react';
import { render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';

test('renders react client text', () => {
  render(<Toolbar />);
  const linkElement = screen.getByText(/react client/i);
  expect(linkElement).toBeInTheDocument();
});
