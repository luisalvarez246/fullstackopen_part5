import { useState } from 'react';
import '../styles/Blog.css';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlogs, notificationSetter }) =>
{
	const	[showFull, setShowFull] = useState(false);
	const	[likes, setlikes] = useState(blog.likes);

	const toggleBlog = () =>
	{
		setShowFull(!showFull);
	};

	const handleLikes = async () =>
	{
		const	updatedBlog =
		{
			likes: likes + 1,
			user: blog.user.id
		}
		try
		{
			await updateBlogs(blog.id, updatedBlog);
			setlikes(likes + 1);
		}
		catch(error)
		{
			const	newError = error.response.data.error;
			notificationSetter({ error: newError });
		}
	};

	const handleDeletion = async () =>
	{
		if (window.confirm('You sure you want to delete this blog?'))
		{
			try
			{
				const	newMessage = `blog ${blog.title} was deleted`;
				await blogService.deleteBlog(blog.id);
				await updateBlogs();
				notificationSetter({ message: newMessage });
			}
			catch(error)
			{
				const	newError = error.response.data.error;
				notificationSetter({ error: newError });
			}
		}
	};

	return (
		<>
			{showFull ?
				<section className="blog">
					<div className="blog-title">
						{blog.title} {blog.author}
						<button onClick={toggleBlog} className="toggle-button">hide</button>
					</div>
					<p className="blog-details">{blog.url}</p>
					<div className="blog-likes">
						<p className="blog-details">likes {likes}</p>
						<button onClick={handleLikes} className="likes-button">like</button>
					</div>
					<p className="blog-details">{blog.user.username}</p>
					<button onClick={handleDeletion} className="delete-button">remove</button>
				</section> :
				<section className="blog-title">
					{blog.title} {blog.author}
					<button onClick={toggleBlog} className="toggle-button">view</button>
				</section>
			}
		</>
	)}

export default Blog