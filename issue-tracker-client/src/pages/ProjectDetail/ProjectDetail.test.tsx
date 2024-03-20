import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectDetail from './ProjectDetail';

test('renders project detail text', () => {
  render(<ProjectDetail />);
  const linkElement = screen.getByText(/project/i);
  expect(linkElement).toBeInTheDocument();
});
