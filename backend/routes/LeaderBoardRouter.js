const { Router } = require('express');
const controller = require('../controllers/UserController');
const router = Router();

router.get('/', controller.getAllLeaderBoard);
router.get('/:id', controller.getLeaderBoardById);

module.exports = router;
