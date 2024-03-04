import express from 'express';
import './db/connection.js';
import User from './models/user.js';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
})

//mognsoo find all users
app.get('/users', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

//get user by id
app.get('/users/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

//create user
app.post('/users', async (req, res) => {
	try {
		const user = new User({
			name: req.body.name,
			email: req.body.email
		});
		await user.save();
		res.status(201).json(user);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

//modify user
app.put('/users/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		user.name = req.body.name;
		user.email = req.body.email;
		await user.save();
		res.json(user);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

//delete user
app.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

export default app;







