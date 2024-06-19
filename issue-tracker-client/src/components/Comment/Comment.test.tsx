import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from './Comment';

test('renders issue description', () => {
  render(<Comment comment_text="" id="" userid="" modified_date="" onCommentChange={() => null} />);
  const linkElement = screen.findByPlaceholderText(/write a comment.../i);
  expect(linkElement).toBeInTheDocument();
});
