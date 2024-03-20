import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectList from './ProjectList';

test('renders projects text', () => {
  render(<ProjectList />);
  const linkElement = screen.getByText(/projects/i);
  expect(linkElement).toBeInTheDocument();
});
