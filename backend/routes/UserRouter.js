const { Router } = require('express');
const controller = require('../controllers/UserController');
const router = Router();

router.get('/', controller.getAllUser);
router.get('/:id', controller.getUserUserById);
router.post('/createuser', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
