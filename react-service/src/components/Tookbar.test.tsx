import React from 'react';
import { render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';

test('renders react service text', () => {
  render(<Toolbar />);
  const linkElement = screen.getByText(/react service/i);
  expect(linkElement).toBeInTheDocument();
});
