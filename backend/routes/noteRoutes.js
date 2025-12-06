const router = require('express').Router()
const { addNote, getAllNotes, getNote, updateNote, deleteNote } = require('../controllers/noteController')
const { authenticateToken } = require('../middlewares/authMiddleware')

router.post('/addNote',authenticateToken,addNote)
router.get('/getNotes',authenticateToken,getAllNotes)
router.get('/getNote/:noteId',authenticateToken,getNote)
router.patch('/updateNote/:noteId',authenticateToken,updateNote)
router.delete('/deleteNote/:noteId',authenticateToken,deleteNote)

module.exports = router