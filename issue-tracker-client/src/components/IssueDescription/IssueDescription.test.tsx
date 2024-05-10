import React from 'react';
import { render, screen } from '@testing-library/react';
import IssueDescription from './IssueDescription';

test('renders issue description', () => {
  render(<IssueDescription issue_description="" onIssueDescriptionChange={() => null} />);
  const linkElement = screen.getByText(/description/i);
  expect(linkElement).toBeInTheDocument();
});
