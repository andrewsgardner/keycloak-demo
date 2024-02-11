import React from 'react';
import { render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';

test('renders issue tracker client text', () => {
  render(<Toolbar />);
  const linkElement = screen.getByText(/issue tracker client/i);
  expect(linkElement).toBeInTheDocument();
});
