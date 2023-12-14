import { useState } from "react";
import '../styles/Blog.css';
import blogService from '../services/blogs';

const Blog = ({ blog }) => 
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
			await blogService.updateBlog(blog.id, updatedBlog);
			setlikes(likes + 1);
		}
		catch(error)
		{
			console.log(error);
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
						<button onClick={handleLikes}>like</button>
					</div>
					<p className="blog-details">{blog.user.username}</p>
				</section> :
				<section className="blog-title">
					{blog.title} {blog.author}
					<button onClick={toggleBlog} className="toggle-button">view</button>
				</section>
			}
		</>  
)}

export default Blog