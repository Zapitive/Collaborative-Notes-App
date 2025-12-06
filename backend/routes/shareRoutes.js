const express = require('express');
const { getUsers, shareRequest, allShareRequests, statusUpdate } = require('../controllers/shareNoteController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/getUsers/:noteId',authenticateToken,getUsers);
router.post('/shareRequest/:receiverId/:noteId',authenticateToken,shareRequest);
router.get('/allShareRequests',authenticateToken,allShareRequests);
router.post('/statusUpdate/:shareRequestId',authenticateToken,statusUpdate);

module.exports = router;