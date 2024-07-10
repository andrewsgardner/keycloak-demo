import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from './Comment';

test('renders comment', () => {
  render(<Comment comment_text="" id="" authUsername="" userid="" modified_date="" onCommentChange={() => null} onCommentDelete={() => null} />);
  const linkElement = screen.findByPlaceholderText(/write a comment.../i);
  expect(linkElement).toBeInTheDocument();
});
