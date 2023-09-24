const {
  addMessage,
  getAllMessage,
} = require('../controllers/messagesController');
const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require('../controllers/userController');

const router = require('express').Router();

router.post('/addmsg', addMessage);
router.get('/getmsg', getAllMessage);

module.exports = router;
