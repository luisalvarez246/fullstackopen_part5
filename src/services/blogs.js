import axios from 'axios'
const baseUrl = '/api/blogs'

let	token = null;

const setToken = (newToken) =>
{
	token = `bearer ${newToken}`;
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

const updateBlog = async (id, updatedObject) =>
{
	const	response = await axios.put(`${baseUrl}/${id}`, updatedObject);

	return (response.data);
};

const deleteBlog = async (id) =>
{
	const	config =
	{
		headers: {Authorization: token}, 
	}
	const	response = await axios.delete(`${baseUrl}/${id}`, config);

	return (response.data);
};

export default { getAll, saveBlog, setToken, updateBlog, deleteBlog };