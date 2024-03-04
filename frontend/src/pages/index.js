import React, { useState, useEffect } from 'react';
import CardComponent from '../components/CardComponent';
import axios from 'axios';

export default function Home() {
	const apiURL = process.env.API_URL || 'http://localhost:4000/';
	const [videos, setVideos] = useState([]);
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({});
	const [updateUser, setUpdateUser] = useState({});

	//fetch users
	useEffect(() => {
		const fetchUsers = async () => {
			try{
				const res = await axios.get(apiURL + 'users');
				setUsers(res.data);
			} catch(err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, []);

	const createUser = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(apiURL + 'users', newUser);
			setUsers([...users, res.data]);
			setNewUser({ name: '', email: '' });
		} catch (err) {
			console.log(err);
		}
	
	}

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(apiURL + 'users/' + updateUser._id, updateUser);
			setUsers(users.map((user) => (user._id === updateUser._id ? res.data : user)));
			setUpdateUser({ _id: '', name: '', email: '' });
		} catch (err) {
			console.log(err);
		}
	}

	const deleteUser = async (id) => {
		try {
			await axios.delete(apiURL + 'users/' + id);
			setUsers(users.filter((user) => user._id !== id));
		} catch (err) {
			console.log(err);
		}
	
	}

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
		  <div className="space-y-4 w-full max-w-2xl">
			<h1 className="text-2xl font-bold text-gray-800 text-center">User Management App</h1>
	
			{/* Create user */}
			<form onSubmit={createUser} className="p-4 bg-blue-100 rounded shadow">
			  <input
				placeholder="Name"
				value={newUser.name}
				onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
				className="mb-2 w-full p-2 border border-gray-300 rounded"
			  />
			  <input
				placeholder="Email"
				value={newUser.email}
				onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
				className="mb-2 w-full p-2 border border-gray-300 rounded"
			  />
			  <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
				Add User
			  </button>
			</form>
	
			{/* Update user */}
			<form onSubmit={handleUpdateUser} className="p-4 bg-green-100 rounded shadow">
			  <input
				placeholder="User ID"
				value={updateUser._id}
				onChange={(e) => setUpdateUser({ ...updateUser, _id: e.target.value })}
				className="mb-2 w-full p-2 border border-gray-300 rounded"
			  />
			  <input
				placeholder="New Name"
				value={updateUser.name}
				onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
				className="mb-2 w-full p-2 border border-gray-300 rounded"
			  />
			  <input
				placeholder="New Email"
				value={updateUser.email}
				onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
				className="mb-2 w-full p-2 border border-gray-300 rounded"
			  />
			  <button type="submit" className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600">
				Update User
			  </button>
			</form>
	
			{/* Display users */}
			<div className="space-y-2">
			  {users.map((user) => (
				<div key={user._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
				  <CardComponent card={user} />
				  <button onClick={() => deleteUser(user._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
					Delete User
				  </button>
				</div>
			  ))}
			</div>
		  </div>
		</main>
	);
}

