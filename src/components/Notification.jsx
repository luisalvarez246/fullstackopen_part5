import '../styles/Notification.css';

const	Notification = ({ message, error }) =>
{
	if (message)
	{		
		return (
			<div className='message'>
				{message}
			</div>
		)
	}
	else if (error)
	{
		return (
			<div className='error'>
				{error}
			</div>
		)
	}
	return (null);
}

export default Notification;