var Twig = require('twig'), // Twig module
    twig = Twig.twig; // Render function

var express = require('express');

var session = require('cookie-session'); // middleware session
var bodyParser = require('body-parser'); // middleware gestion de paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false});

var router = express.Router();

router.use(session({secret: 'todo'}));

router.use(function(req, res, next){
  if (typeof (req.session.todolist) == 'undefined') {
    req.session.todolist = [];
  }
  next();
})


/* GET home page. */
.get('/todo', function(req, res, next) {
  res.render('index.twig', {
    title: 'Votre Todolist !',
    todolist: req.session.todolist
  });
})

.post('/todo/ajouter/', urlencodedParser, function(req, res){
  if (req.body.newtodo != '') {
    req.session.todolist.push(req.body.newtodo);
  }
  res.redirect('/todo');
})

.get('/todo/supprimer/:id', function(req, res) {
  if (req.params.id != '') {
    req.session.todolist.splice(req.params.id, 1);
  }
  res.redirect('/todo');
})

.use(function (req, res, next) {
  res.redirect('/todo');
});


module.exports = router;
