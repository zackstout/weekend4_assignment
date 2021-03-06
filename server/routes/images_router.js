
var express = require('express');
var router = express.Router();
var pg = require('pg');
var images = require('../modules/images.js');

var config = {
  database: 'deneb',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);

//
router.put('/likes/:id', function(req, res){
  console.log(req.body.id);
  for (var i = 0; i < images.length; i++) {
    if (images[i].id == req.body.id) {
      images[i].likes ++;
      images[i].anyLikes = true;
      console.log(images[i]);
    }
  }
  res.sendStatus(201);
}); //end PUT route for likes

router.put('/comments/:id', function(req, res){
  // console.log(req.body.comment);
  for (var i = 0; i < images.length; i++) {
    if (images[i].id == req.body.id) {
      images[i].comments.push(req.body.comment);
      console.log(images[i]);
    }
  }
  res.sendStatus(201);
}); //end PUT route for comments

router.put('/showComments/:id', function(req, res){
  // console.log(req.body.comment);
  for (var i = 0; i < images.length; i++) {
    if (images[i].id == req.body.id) {
      images[i].showComments = !images[i].showComments;
      console.log(images[i]);
    }
  }
  res.sendStatus(201);
}); //end PUT route for showComments

router.put('/views/:id', function(req, res){
  console.log(req.body.id);
  for (var i = 0; i < images.length; i++) {
    if (images[i].id == req.body.id) {
      images[i].showPic = !images[i].showPic;
      if (!images[i].showPic) {
        images[i].views ++;
      }
      console.log(images[i]);
    }
  }
  res.sendStatus(201);
}); //end PUT route for views

router.get('/', function(req, res){
  res.send(images);
});



module.exports = router;
