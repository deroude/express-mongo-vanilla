import mongoose from 'mongoose';

const ArticleSchema = mongoose.Schema({
    title: { type: String, required: true },
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
        timestamps: true
    });

export const Article = mongoose.model('Article', ArticleSchema);