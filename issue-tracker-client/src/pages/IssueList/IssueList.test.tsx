import React from 'react';
import { render, screen } from '@testing-library/react';
import IssueList from './IssueList';

test('renders issues text', () => {
  render(<IssueList />);
  const linkElement = screen.getByText(/issues/i);
  expect(linkElement).toBeInTheDocument();
});
