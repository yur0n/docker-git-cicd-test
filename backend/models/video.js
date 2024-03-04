import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
	title: { type: String },
	description: { type: String },
	publishedAt: { type: Date },
	categoryId: { type: Number },
	channelId: { type: String },
	channelTitle: { type: String },
	channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
	viewCount: { type: Number },
	likeCount: { type: Number },
	commentCount: { type: Number },
	topicDetails: { type: [String] },
	thumbnail: { type: String }
});

export default mongoose.model('Video', schema);
