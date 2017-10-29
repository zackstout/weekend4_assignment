
console.log('js');

var picsApp = angular.module('picsApp', []);

picsApp.controller('CommandCenter', function($http) {
  var cc = this;
  getPics();

  cc.clickImage = function(pic) {
    console.log('in here', pic.showPic);
    pic.showPic = !pic.showPic;
    console.log('in here again', pic.showPic);
    if (!pic.showPic) {
      $http.put('/images/views/' + pic.id, pic).then(function (response) {
        console.log('w00t');
        getPics();
      }).catch(function (err) {
        console.log('whoops', err);
      });
    } else {
      $http.put('/images/views/' + pic.id, pic).then(function (response) {
        console.log('w00t');
        getPics();
      }).catch(function (err) {
        console.log('whoops', err);
      });
    }
  };

  cc.people = 'No one likes this </3';

  cc.clickLike = function(pic) {
    console.log('in likes', pic.likes);
    pic.likes ++;
    
    // if (pic.likes == 1) {
    //   cc.people = '1 person likes this';
    // } else {
    //   cc.people = pic.likes + ' people like this!!!';
    // }
    $http.put('/images/likes/' + pic.id, pic).then(function (response) {
      console.log('w00t');
      getPics();
    }).catch(function (err) {
      console.log('whoops', err);
    });
  };

  cc.clickComment = function(pic) {
    pic.comments.push(angular.copy(cc.comment));
    console.log(pic.comments);
  };

//really unclear why clicking on this button adds stuff to the comments array
  cc.showComments = function(pic) {
    pic.showComments = !pic.showComments;
  };

  cc.images = [];

  function getPics() {
    $http.get('/images').then(function (response) {
      console.log('got pics!');
      cc.images = response.data;
      console.log(cc.images);
    }).catch(function (err) {
      console.log('whooooops');
    });
  }


});
