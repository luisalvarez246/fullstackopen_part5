import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () =>
{
	const	[blogs, setBlogs] = useState([]);
	const	[user, setUser] = useState(null);
	const	blogCreateRef = useRef();
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
		notificationSetter({ message: 'Successfully logged out' });
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

	const reloadBlogs = async () =>
	{
		const	response = await blogService.getAll();
		setBlogs(response);
	}

	const updateBlog = async (id, updatedBlog) =>
	{
		await blogService.updateBlog(id, updatedBlog);
		await reloadBlogs();
	};

	const saveBlog = async (formData) =>
	{
		await blogService.saveBlog(formData);
		await reloadBlogs();
	}

	const deleteBlog = async (id) =>
	{
		await blogService.deleteBlog(id);
		await reloadBlogs();
	}

	const blogEntries = () =>
	{
		return (
			<>
				<h2>blogs</h2>
				<div>
					<p>{user.username} logged in</p>
					<button onClick={cleanStorage}>logout</button>
				</div>
				<Togglable buttonLabel='create blog' ref={blogCreateRef}>
					<CreateBlog saveBlog={saveBlog} notificationSetter={notificationSetter} blogCreateRef={blogCreateRef}/>
				</Togglable>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} notificationSetter={notificationSetter}/>
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