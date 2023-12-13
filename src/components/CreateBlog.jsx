import { useState } from "react";
import blogService from '../services/blogs'

const CreateBlog = ({ setBlogs, notificationSetter }) =>
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
			await blogService.saveBlog(formData);
			const	blogs = await blogService.getAll();
			const	newMessage = `A new blog ${formData.title} by ${formData.author} added`;
			notificationSetter({ message: newMessage });
			setFormData(
			{
				title: '',
				author: '',
				url: ''
			})
			setBlogs(blogs);
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
					<label htmlFor="Title">title</label>
					<input 
						name="Title"
						id="Title"
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
					<label htmlFor="Author">author</label>
					<input 
						name="Author"
						id="Author"
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
					<label htmlFor="Url">url</label>
					<input 
						name="Url"
						id="Url"
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