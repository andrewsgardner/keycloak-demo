import React from 'react';
import { render, screen } from '@testing-library/react';
import NewComment from './NewComment';
import { IUser } from '../../interfaces/user.interface';

const authUser: IUser = {
  id: '',
  username: '',
  first_name: '',
  last_name: '',
};

test('renders new comment', () => {
  render(<NewComment authUser={authUser} onNewComment={() => null} onCloseIssue={() => null} />);
  const linkElement = screen.findByPlaceholderText(/write a comment.../i);
  expect(linkElement).toBeInTheDocument();
});
