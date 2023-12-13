import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'

const App = () => 
{
  const [blogs, setBlogs] = useState([]);
  const	[user, setUser] = useState(null);

	useEffect(() => 
	{
		const	loggedUser = window.localStorage.getItem('loggedUser');

		blogService.getAll().then(blogs => setBlogs( blogs ));
		if (loggedUser)
		{
			const	parsedUser = JSON.parse(loggedUser);
			setUser(parsedUser);
			blogService.setToken(parsedUser.token);
		}
	}, [])

	const cleanStorage = () =>
	{
		window.localStorage.clear();
		setUser(null);
	};

	const blogEntries = () =>
	{	
		return (
			<>
				<h2>blogs</h2>
				<div>
					<p>{user.username} logged in</p>
					<button onClick={cleanStorage}>logout</button>
				</div>
				<CreateBlog setBlogs={setBlogs}/>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</>
		)	
	}

  return (
	<>
		{user === null ?
			<Login setUser={setUser}/> :
			blogEntries()
		}
    </>
  )
}

export default App