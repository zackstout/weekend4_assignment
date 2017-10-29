
var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'deneb',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);


var styleHigh = {
  width: '380px',
  height: 'auto',
  'margin':'15px',
  'padding':'15px'
};

var styleWide = {
  height: '400px',
  width: 'auto',
  'margin':'15px',
  'padding':'15px'
};

var styleHigh2 = {
  width: 'auto',
  height: '600px',
  'border-radius': '10px',
  'background-color': 'gray',
  'margin': '20px',
  'padding': '20px'
};

var styleWide2 = {
  height: 'auto',
  width: '500px',
  'border-radius': '10px',
  'background-color': 'gray',
  'margin': '20px',
  'padding': '20px'
};

var style2 = {
  width: '400px',
  height: '400px',

};


var image0 = {
  id: 0,
  path: "styles/images/doogle.jpg",
  description: "HELLO THERE",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleWide,
  style2: style2,
  styleHolder: styleWide2
};

var image1 = {
  id: 1,
  path: "styles/images/bball.jpg",
  description: "HI",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleWide,
  style2: style2,
  styleHolder: styleWide2
};

var image2 = {
  id: 2,
  path: "styles/images/calf.jpg",
  description: 'what up!!!',
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleHigh,
  style2: style2,
  styleHolder: styleHigh2
};

var image3 = {
  id: 3,
  path: "styles/images/homies.jpg",
  description: "HI",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleWide,
  style2: style2,
  styleHolder: styleWide2
};

var image4 = {
  id: 4,
  path: "styles/images/shorts.jpg",
  description: "HI",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleHigh,
  style2: style2,
  styleHolder: styleHigh2
};

var image5 = {
  id: 5,
  path: "styles/images/reflection.jpg",
  description: "HI",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleHigh,
  style2: style2,
  styleHolder: styleHigh2
};

var image6 = {
  id: 6,
  path: "styles/images/theweeds.jpg",
  description: "HI",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleWide,
  style2: style2,
  styleHolder: styleWide2
};

var image7 = {
  id: 7,
  path: "styles/images/winter.jpg",
  description: "HI",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleWide,
  style2: style2,
  styleHolder: styleWide2
};

var image8 = {
  id: 8,
  path: "styles/images/silo.jpg",
  description: "HI",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleHigh,
  style2: style2,
  styleHolder: styleHigh2
};

var image9 = {
  id: 9,
  path: "styles/images/sbsb.jpg",
  description: "HI",
  showPic: true,
  likes: 0,
  views: 0,
  comments: [],
  showComments: false,
  style: styleWide,
  style2: style2,
  styleHolder: styleWide2
};

// var images = {
//   image1: image1,
//   image2: image2,
//   image3: image3
// };

var images = [image0, image1, image2, image3, image4, image5, image6, image7, image8, image9];

//
router.put('/likes/:id', function(req, res){
    console.log(req.body.id);
    // images.splice(req.body.id, 1);
    for (var i = 0; i < images.length; i++) {
      if (images[i].id == req.body.id) {
        images[i].likes ++;
        console.log(images[i]);
        // images.splice(req.body.id, 0, images[i]);
      }
    }
    res.sendStatus(201);
  });

  router.put('/views/:id', function(req, res){
      console.log(req.body.id);
      // images.splice(req.body.id, 1);
      for (var i = 0; i < images.length; i++) {
        if (images[i].id == req.body.id) {
          images[i].showPic = !images[i].showPic;
          if (!images[i].showPic) {
          images[i].views ++;
        }
          console.log(images[i]);
          // images.splice(req.body.id, 0, images[i]);
        }
      }
      res.sendStatus(201);
    });

router.get('/', function(req, res){
    res.send(images);
    // console.log(images);
});


//i'm realizing now we're going to have to put the images all the way back in the DB
router.put('/:id', function(req,res){
  var imageId = req.params.id;
  console.log(editId);
  //res.sendStatus(200);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'UPDATE "hotel_pets" SET "name" = $1, "breed" = $2, "color" = $3 WHERE "id" = $4;';
      db.query(queryText, [req.body.petNameIn, req.body.petBreedIn, req.body.petColorIn, editId], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back success!
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
}); //END PUT ROUTE



module.exports = router;
