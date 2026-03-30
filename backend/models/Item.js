import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ['lost', 'found', 'returned'],
            default: 'lost',
        },
    },
    {
        timestamps: true,
    }
);

itemSchema.index({ title: 'text', description: 'text' });
itemSchema.index({ category: 1, status: 1 });
itemSchema.index({ location: 1 });

const Item = mongoose.model('Item', itemSchema);
export default Item;
