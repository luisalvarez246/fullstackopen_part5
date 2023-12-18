import React from 'react';
import	'@testing-library/jest-dom';
import	{ screen, render } from '@testing-library/react';
import	userEvent from '@testing-library/user-event';
import	CreateBlog from '../components/CreateBlog';

test('create blog button calls saveBlog once', async () =>
{
	//arrange
	const	formData =
	{
		title: 'Test Title',
		author: 'Test Author',
		url: 'test.com'
	}
	const	ftEmpty = () => {};
	//act
	const	mockSaveBlog = jest.fn();
	const	mockBlogRef = jest.fn();
	const	{ container } = render(<CreateBlog saveBlog={mockSaveBlog} notificationSetter={ftEmpty} blogCreateRef={mockBlogRef} />);
	const	user = userEvent.setup();

	const	inputArray = screen.getAllByRole('textbox');
	const	saveButton = screen.getByRole('button');

	await user.type(inputArray[0], formData.title);
	await user.type(inputArray[1], formData.author);
	await user.type(inputArray[2], formData.url);
	await user.click(saveButton);
	//assert
	expect(mockSaveBlog.mock.calls).toHaveLength(1);
	expect(mockSaveBlog.mock.calls[0][0].title).toBe('Test Title');
	expect(mockSaveBlog.mock.calls[0][0].author).toBe('Test Author');
	expect(mockSaveBlog.mock.calls[0][0].url).toBe('test.com');
})