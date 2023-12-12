import { useState } from 'react'
import '../styles/Login.css'
import	loginService from '../services/login'

const Login = ({ setUser }) =>
{
	const	[username, setUsername] = useState('');
	const	[password, setPassword] = useState('');

	const handleLogin = async (event) =>
	{		
		event.preventDefault();
		try
		{
			const	response = await loginService.userLogin({username, password});
			setUser(response);
			setUsername('');
			setPassword('');
		}
		catch (error)
		{
			console.log(error);
		}
	};
	
	return (
		<>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<fieldset>
					<label htmlFor='Username'>Username</label>
					<input
						type='text'
						name='Username'
						id='Username'
						value={username}
						onChange={({target}) => setUsername(target.value)}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor='Password'>Password</label>
					<input
						type='password'
						name='Password'
						id='Password'
						value={password}
						onChange={({target}) => setPassword(target.value)}
					/>
				</fieldset>
				<button type='submit'>login</button>
			</form>
		</>
	);
};

export default Login;