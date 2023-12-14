import { useState } from "react";
import '../styles/Blog.css';

const Blog = ({ blog }) => 
{
	const	[showFull, setShowFull] = useState(false);

	const toggleBlog = () =>
	{
		setShowFull(!showFull);
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
						<p className="blog-details">likes {blog.likes}</p>
						<button>like</button>
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