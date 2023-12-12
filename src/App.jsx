import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => 
{
  const [blogs, setBlogs] = useState([]);
  const	[user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

	const blogEntries = () =>
	{	
		return (
			<>
				<h2>blogs</h2>
				<p>{user.username} logged in</p>
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