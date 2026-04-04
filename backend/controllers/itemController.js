import asyncHandler from 'express-async-handler';
import Item from '../models/Item.js';
import Claim from '../models/Claim.js';

// @desc    Create an item
// @route   POST /api/items
// @access  Private
export const createItem = asyncHandler(async (req, res) => {
    const { title, description, category, location, date, image, status } = req.body;

    const item = new Item({
        user: req.user._id,
        title,
        description,
        category,
        location,
        date,
        image,
        status,
    });

    const createdItem = await item.save();
    return res.status(201).json(createdItem);
});

// @desc    Get all items with search and filters
// @route   GET /api/items
// @access  Public
export const getItems = asyncHandler(async (req, res) => {
    const { search, category, location, status, pageNumber } = req.query;
    
    const pageSize = 10;
    const page = Number(pageNumber) || 1;

    let query = {};

    if (search) {
        query.$text = { $search: search };
    }
    if (category) {
        query.category = category;
    }
    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }
    if (status) {
        query.status = status;
    }

    const count = await Item.countDocuments(query);
    const items = await Item.find(query)
        .populate('user', 'name email')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    return res.json({ items, page, pages: Math.ceil(count / pageSize), count });
});

// @desc    Get user's items
// @route   GET /api/items/my
// @access  Private
export const getMyItems = asyncHandler(async (req, res) => {
    const items = await Item.find({ user: req.user._id })
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    return res.json(items);
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
export const getItemById = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)
        .populate('user', 'name email');

    if (item) {
        return res.json(item);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
export const updateItem = asyncHandler(async (req, res) => {
    const { title, description, category, location, date, image, status } = req.body;

    const item = await Item.findById(req.params.id);

    if (item) {
        if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this item');
        }

        item.title = title || item.title;
        item.description = description || item.description;
        item.category = category || item.category;
        item.location = location || item.location;
        item.date = date || item.date;
        item.image = image || item.image;
        item.status = status || item.status;

        const updatedItem = await item.save();
        return res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
export const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (item) {
        if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to delete this item');
        }

        await Claim.deleteMany({ item: item._id });
        await Item.deleteOne({ _id: item._id });
        return res.json({ message: 'Item removed' });
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});
