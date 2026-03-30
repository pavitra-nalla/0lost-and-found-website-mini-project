import express from 'express';
import { body } from 'express-validator';
import { createClaim, getUserClaims } from '../controllers/claimController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validator.js';

const router = express.Router();

router.route('/')
    .post(protect, [
        body('item', 'Item ID is required').notEmpty(),
        body('message', 'Message is required').notEmpty(),
        validateRequest
    ], createClaim)
    .get(protect, getUserClaims);

export default router;
