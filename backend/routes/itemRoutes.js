import express from 'express';
import { body } from 'express-validator';
import {
    createItem,
    getItems,
    getMyItems,
    getItemById,
    updateItem,
    deleteItem,
} from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validator.js';

const router = express.Router();

router.route('/')
    .post(protect, [
        body('title', 'Title is required').notEmpty(),
        body('description', 'Description is required').notEmpty(),
        body('category', 'Category is required').notEmpty(),
        body('location', 'Location is required').notEmpty(),
        body('date', 'Valid date is required').isISO8601(),
        validateRequest
    ], createItem)
    .get(getItems);

router.route('/my').get(protect, getMyItems);

router.route('/:id')
    .get(getItemById)
    .put(protect, [
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('description').optional().notEmpty().withMessage('Description cannot be empty'),
        body('category').optional().notEmpty().withMessage('Category cannot be empty'),
        body('location').optional().notEmpty().withMessage('Location cannot be empty'),
        body('date').optional().isISO8601().withMessage('Date must be a valid ISO8601 string'),
        body('status').optional().isIn(['lost', 'found', 'returned']).withMessage('Status is invalid'),
        validateRequest
    ], updateItem)
    .delete(protect, deleteItem);

export default router;
