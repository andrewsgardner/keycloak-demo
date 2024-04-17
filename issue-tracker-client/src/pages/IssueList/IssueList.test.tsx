import React from 'react';
import { render, screen } from '@testing-library/react';
import IssueList from './IssueList';

test('renders issue list text', () => {
  render(<IssueList />);
  const linkElement = screen.getByText(/issue/i);
  expect(linkElement).toBeInTheDocument();
});
