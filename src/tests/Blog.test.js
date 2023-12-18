import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('Blog displays title, author, url and likes when button show is clicked', async () =>
{
	//arrange
	const	blog =
		{
			title: 'Test Title',
			author: 'Test Author',
			url: 'Test Url',
			likes: 0,
			user:
				{
					username: '',
					id: '',
					name: ''
				}
		}
	let		title;
	let		author;
	let		urlLikesArray;
	const	ftEmpty = () => {};

	//act
	const	{ container } = render(<Blog blog={blog} updateBlogs={ftEmpty} notificationSetter={ftEmpty} />);
	const	user = userEvent.setup();
	const	button = container.querySelector('.toggle-button');
	await	user.click(button);

	title = screen.getByText(/Test Title/);
	author = screen.getByText(/Test Author/);
	urlLikesArray = container.querySelector('.blog-details');
	screen.debug();
	//assert
	expect(title).toBeDefined();
	expect(author).toBeDefined();
	expect(urlLikesArray).toBeDefined();
})

test('Press like button twice triggers updateBlogs twice', async () =>
{
	//arrange
	const	blog =
		{
			title: 'Test Title',
			author: 'Test Author',
			url: 'Test Url',
			likes: 0,
			user:
				{
					username: '',
					id: '',
					name: ''
				}
		}
	const	ftEmpty = () => {};

	//act
	const	mockUpdateBlogs = jest.fn();
	const	{ container } = render(<Blog blog={blog} updateBlogs={mockUpdateBlogs} notificationSetter={ftEmpty} />);
	const	user = userEvent.setup();
	const	viewButton = container.querySelector('.toggle-button');
	await	user.click(viewButton);
	const	likesButton = container.querySelector('.likes-button');
	await	user.click(likesButton);
	await	user.click(likesButton);
	screen.debug();
	//assert
	expect(mockUpdateBlogs.mock.calls).toHaveLength(2);
})