import React from 'react';
import { render, screen } from '@testing-library/react';
import IssueDetail from './IssueDetail';

test('renders issue detail text', () => {
  render(<IssueDetail />);
  const linkElement = screen.getByText(/issue/i);
  expect(linkElement).toBeInTheDocument();
});
