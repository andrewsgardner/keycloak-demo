import React from 'react';
import { render, screen } from '@testing-library/react';
import FormDialog from './FormDialog';

test('renders form dialog', () => {
  render(<FormDialog />);
  const linkElement = screen.getByText(/new/i);
  expect(linkElement).toBeInTheDocument();
});
