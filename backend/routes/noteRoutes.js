const router = require('express').Router()
const { addNote, getAllNotes, giveAccess } = require('../controllers/noteController')
const { authenticateToken } = require('../middlewares/authMiddleware')

router.post('/addNote',authenticateToken,addNote)
router.get('/getNotes',authenticateToken,getAllNotes)
router.post('/giveaccess/:docid/:accid',giveAccess)

module.exports = router