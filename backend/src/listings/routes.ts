import { Router } from 'express';
import { authenticateUser } from '../shared/middleware/authMiddleware';
import { getListings, createListing, getListingById, searchListings } from './controller';

let router = Router();

router.get('/', getListings);
router.get('/search', searchListings);
router.get('/:id', getListingById);
router.post('/', authenticateUser, createListing);

export default router;