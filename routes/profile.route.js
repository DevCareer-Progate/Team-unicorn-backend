import express from 'express';
const router = express.Router();

import { getProfile, deleteProfile, updateProfile } from '../controllers/profile.controller';

//Handle get request for a single user profile details
router.get('/api/v1/profile/:id', getProfile);
router.delete('/api/v1/profile/:id', deleteProfile);
router.patch('/api/v1/profile/:id', updateProfile);


export default router;

