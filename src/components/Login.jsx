import { useState } from 'react'
import '../styles/Login.css'
import	loginService from '../services/login'
import	blogService from '../services/blogs'

const Login = ({ setUser, notificationSetter }) =>
{
	const	[username, setUsername] = useState('');
	const	[password, setPassword] = useState('');

	const handleLogin = async (event) =>
	{
		event.preventDefault();
		try
		{
			const	response = await loginService.userLogin({ username, password });
			setUser(response);
			blogService.setToken(response.token)
			setUsername('');
			setPassword('');
			window.localStorage.setItem('loggedUser', JSON.stringify(response));
			notificationSetter({ message: 'Successfully logged in' });
		}
		catch (error)
		{
			const	newError = error.response.data.error;

			console.log(newError);
			notificationSetter({ error: newError });
		}
	};

	return (
		<>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<fieldset>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						name='username'
						id='username'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</fieldset>
				<button id='login-button' type='submit'>login</button>
			</form>
		</>
	);
};

export default Login;