import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	id: { type: String, unique: true, required: true },
	title: { type: String },
	description: { type: String },
	customUrl: { type: String },
	publishedAt: { type: Date },
	thumbnail: { type: String },
	country: { type: String },
	viewCount: { type: Number },
	subscriberCount: { type: Number },
	videoCount: { type: Number },
	topicDetails: { type: [String] },
	videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
})

export default mongoose.model('Channel', schema)
