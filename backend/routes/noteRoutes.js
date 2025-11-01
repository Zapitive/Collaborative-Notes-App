const router = require('express').Router()
const { addNote, getAllNotes, giveAccess, getNote, updateNote } = require('../controllers/noteController')
const { authenticateToken } = require('../middlewares/authMiddleware')

router.post('/addNote',authenticateToken,addNote)
router.get('/getNotes',authenticateToken,getAllNotes)
router.get('/getNote/:noteId',authenticateToken,getNote)
router.put('/updateNote/:noteId',authenticateToken,updateNote)
router.post('/giveaccess/:docid/:accid',giveAccess)

module.exports = router