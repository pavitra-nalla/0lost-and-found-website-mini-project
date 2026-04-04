import mongoose from 'mongoose';

const claimSchema = mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item',
        },
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

claimSchema.index({ item: 1, requester: 1 });
claimSchema.index({ status: 1 });

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;
