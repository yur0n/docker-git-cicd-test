import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGO_CONNECT);