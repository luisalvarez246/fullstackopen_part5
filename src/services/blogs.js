import axios from 'axios'
const baseUrl = '/api/blogs'

let	token = null;

const setToken = (newToken) =>
{
	token = `bearer ${newToken}`;
	console.log(token);
};

const getAll = async () => 
{
	const response = await axios.get(baseUrl)
	return (response.data);
}

const saveBlog = async (newObject) =>
{
	const	config =
	{
		headers: {Authorization: token}, 
	}
	const	response = await axios.post(baseUrl, newObject, config);

	return (response.data);
};

export default { getAll, saveBlog, setToken, token }