import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => 
{
	const	[blogs, setBlogs] = useState([]);
	const	[user, setUser] = useState(null);
	const	[notification, setNotification] = useState(
	{
		newMessage: '',
		newError: ''
	})

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
		notificationSetter({message: 'Successfully logged out'});
	};

	const notificationSetter = (notification) =>
	{
		const	{ message, error } = notification;

		setNotification(
		{
			newMessage: message,
			newError: error
		})
		setTimeout(() =>
		{
			setNotification(
			{
				newMessage: '',
				newError: ''
			})
		}, 5000)
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
				<CreateBlog setBlogs={setBlogs} notificationSetter={notificationSetter} />
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</>
		)	
	}

  return (
	<>
		<Notification message={notification.newMessage} error={notification.newError} />
		{user === null ?
			<Login setUser={setUser} notificationSetter={notificationSetter} /> :
			blogEntries()
		}
    </>
  )
}

export default App