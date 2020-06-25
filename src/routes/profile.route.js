import express from 'express';
const router = express.Router();

import profileCtrl from '../controllers/profile.controller';

//Handle get request for a single user profile details
router.post('/api/v1/profile/', profileCtrl.createProfile)
router.get('/api/v1/profile/:id', profileCtrl.getProfile);
router.delete('/api/v1/profile/:id', profileCtrl.deleteProfile);
router.patch('/api/v1/profile/:id', profileCtrl.updateProfile);

export default router;

