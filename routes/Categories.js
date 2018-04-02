var express = require('express');
var router = express.Router();
var Queries = require('../queries');
var bodyParser = require('body-parser');
var cors = require('cors');

var jwt = require("jsonwebtoken");



router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cors());


router.get('/:id?', function (req, res, next) {
  console.log("posts got api call for categories");

  if (req.params.id) {

    Queries.getCategoryById(req.params.id, function (err, category) {

      if (err) {
        res.json(err);
      }
      else {
        res.json(category);
      }
    });
  }
  else {

    Queries.getCategories(function (err, categories) {

      if (err) {
        res.json(err);
      }
      else {
        console.log("get categories queries worked");
        res.json(categories);
      }

    });
  }
});
router.get('/create/categories', function (req, res, next) {

  Queries.getCategoriesToPost(function (err, categories) {

    if (err) {
      res.json(err);
    }
    else {
      console.log("get categories queries worked");
      res.json(categories);
    }

  });

});
module.exports = router;
