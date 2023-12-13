import { useState, useImperativeHandle, forwardRef } from "react";

const Togglable = forwardRef((props, refs) =>
{
	const	[visibility, setVisibility] = useState(false);
	const	hideWhenVisible = {display: visibility ? 'none' : ''};
	const	showWhenVisible = {display: visibility ? '' : 'none'};

	const toggleVisibility = () =>
	{
		setVisibility(!visibility);
	};

	useImperativeHandle(refs, () =>
	{
		return ({ toggleVisibility });
	})

	return (
		<>
			<section style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</section>
			<section style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</section>
		</>
	);
});

export default Togglable;