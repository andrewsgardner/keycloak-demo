import React from 'react';
import { render, screen } from '@testing-library/react';
import FormFactory from './FormFactory';
import { IFormConfig } from '../../interfaces/form-config.interface';

const props: IFormConfig = {
  grid: {},
  fields: [],
};

test('renders dynamic forms', () => {
  render(<FormFactory {...props} />);
  const linkElement = screen.getByText(/form/i);
  expect(linkElement).toBeInTheDocument();
});
