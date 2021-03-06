var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var signController = require('../controllers/sign_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz-2016' });
});

router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('usuariosId', sessionController.load);

router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/sign', signController.new);
router.post('/sign', signController.create);


/*router.get('/sign/:usuariosId(\\d+)/edit', sessionController.loginRequired, sessionController.edit);
router.put('/sign/:usuariosId(\\d+)', sessionController.loginRequired, sessionController.update);*/

router.get('/sign/:usuariosId(\\d+)/edit', sessionController.adminRequired, sessionController.edit);
router.put('/sign/:usuariosId(\\d+)', sessionController.adminRequired, sessionController.update);
router.delete('/sign/:usuariosId(\\d+)', sessionController.adminRequired, sessionController.delete);


router.get('/user', signController.index); 

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new)
router.post('/quizes/create', sessionController.loginRequired, quizController.create)
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

module.exports = router;
