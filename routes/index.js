var session = require('cookie-session'); // middleware session
var bodyParser = require('body-parser'); // middleware gestion de paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false});

var express = require('express');
var router = express.Router();

router.use(session({secret: 'todo'}))


.use(function(req, res, next){
  if (typeof (req.session.todolist) == 'undefined') {
    req.session.todolist = [];
  }
  next();
});


/* GET home page. */
router.get('/todo', function(req, res, next) {
  res.render('index.jade', {
    title: 'Votre Todolist !',
    todolist: req.session.todolist
  });
});

router.post('/todo/ajouter/', urlencodedParser, function(req, res){
  if (req.body.newtodo != '') {
    req.session.todolist.push(req.body.newtodo);
  }
  res.redirect('/todo');
})

.get('/todo/supprimer/:id', function(res, req){
  if (req.params.id != '') {
    req.session.todolist.splice(req.params.id, 1);
  }
  res.redirect('/todo');
})

.use(function (req, res, next) {
  res.redirect('/todo');
});

module.exports = router;
