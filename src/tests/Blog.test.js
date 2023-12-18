import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';

test('Blog displays title and author by default, but not url and likes', () =>
{
	//arrange
	const	blog =
		{
			title: 'Test Title',
			author: 'Test Author',
			url: 'Test Url',
			likes: 0
		}
	let		title;
	let		author;
	let		urlLikesArray;
	const	ftEmpty = () => {};

	//act
	const	{ container } = render(<Blog blog={blog} updateBlogs={ftEmpty} notificationSetter={ftEmpty} />);
	title = screen.getByText(/Test Title/);
	author = screen.getByText(/Test Author/);
	urlLikesArray = container.querySelector('.blog-details');
	screen.debug();
	//assert
	expect(title).toBeDefined();
	expect(author).toBeDefined();
	expect(urlLikesArray).toBe(null);
})