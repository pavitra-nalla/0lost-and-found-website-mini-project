import asyncHandler from 'express-async-handler';
import Claim from '../models/Claim.js';
import Item from '../models/Item.js';

// @desc    Create a claim
// @route   POST /api/claims
// @access  Private
export const createClaim = asyncHandler(async (req, res) => {
    const { item: itemId, message } = req.body;

    const itemExists = await Item.findById(itemId);
    if (!itemExists) {
        res.status(404);
        throw new Error('Item not found');
    }

    // Check if user already claimed this item
    const existingClaim = await Claim.findOne({ item: itemId, requester: req.user._id });
    if (existingClaim) {
        res.status(400);
        throw new Error('You have already submitted a claim for this item');
    }

    const claim = new Claim({
        item: itemId,
        requester: req.user._id,
        message,
    });

    const createdClaim = await claim.save();
    res.status(201).json(createdClaim);
});

// @desc    Get user claims
// @route   GET /api/claims
// @access  Private
// @note    Returns claims made by the user, or claims on items owned by the user
export const getUserClaims = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    // Claims the user made
    const countMade = await Claim.countDocuments({ requester: req.user._id });
    const requestsMade = await Claim.find({ requester: req.user._id })
        .populate('item', 'title status image')
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .lean();

    // Claims made on user's items
    const userItems = await Item.find({ user: req.user._id }).select('_id');
    const userItemIds = userItems.map((item) => item._id);

    const countReceived = await Claim.countDocuments({ item: { $in: userItemIds } });
    const requestsReceived = await Claim.find({ item: { $in: userItemIds } })
        .populate('item', 'title status image')
        .populate('requester', 'name email')
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .lean();

    // Normalize _id to id for claims
    const normalizeClaim = (claim) => {
        const normalized = { ...claim, id: claim._id.toString() };
        delete normalized._id;
        delete normalized.__v;
        if (normalized.item && normalized.item._id) {
            normalized.item = { ...normalized.item, id: normalized.item._id.toString() };
            delete normalized.item._id;
        }
        if (normalized.requester && normalized.requester._id) {
            normalized.requester = { ...normalized.requester, id: normalized.requester._id.toString() };
            delete normalized.requester._id;
        }
        return normalized;
    };

    const normalizedRequestsMade = requestsMade.map(normalizeClaim);
    const normalizedRequestsReceived = requestsReceived.map(normalizeClaim);

    res.json({
        requestsMade: {
            items: normalizedRequestsMade,
            page,
            pages: Math.ceil(countMade / pageSize),
            count: countMade
        },
        requestsReceived: {
            items: normalizedRequestsReceived,
            page,
            pages: Math.ceil(countReceived / pageSize),
            count: countReceived
        },
    });
});
