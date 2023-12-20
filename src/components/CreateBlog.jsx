import { useState } from 'react';
import blogService from '../services/blogs'

const CreateBlog = ({ saveBlog, notificationSetter, blogCreateRef }) =>
{
	const	[formData, setFormData] = useState({
		title: '',
		author: '',
		url: ''
	})

	const handleBlogCreation = async (event) =>
	{
		event.preventDefault();
		try
		{
			await saveBlog(formData);
			const	newMessage = `A new blog ${formData.title} by ${formData.author} added`;
			notificationSetter({ message: newMessage });
			setFormData(
				{
					title: '',
					author: '',
					url: ''
				})
			blogCreateRef.current.toggleVisibility();
		}
		catch(error)
		{
			console.log(error);
		}
	};

	return (
		<>
			<h2>Create new</h2>
			<form onSubmit={handleBlogCreation}>
				<fieldset>
					<label htmlFor="title">title</label>
					<input
						name="title"
						id="title"
						value={formData.title}
						onChange={({ target }) => setFormData(prevFormData => (
							{
								...prevFormData,
								title: target.value
							}))}
						type='text'
						required={true}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="author">author</label>
					<input
						name="author"
						id="author"
						value={formData.author}
						onChange={({ target }) => setFormData(prevFormData => (
							{
								...prevFormData,
								author: target.value
							}))}
						type='text'
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="url">url</label>
					<input
						name="url"
						id="url"
						value={formData.url}
						onChange={({ target }) => setFormData(prevFormData => (
							{
								...prevFormData,
								url: target.value
							}))}
						type='text'
						required={true}
					/>
				</fieldset>
				<button type="submit">create</button>
			</form>
		</>
	);
};

export default CreateBlog;