var express = require('express');
var router = express.Router();
var Queries = require('../queries');
var bodyParser = require('body-parser');
var cors = require('cors');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var jwt = require("jsonwebtoken");



router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cors());

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {

    Queries.getPostById(req.params.id, function (err, post) {

      if (err) {
        res.json(err);
      }
      else {
        res.json(post);
      }
    });
  }
  else {

    Queries.getPosts(function (err, posts) {

      if (err) {
        console.log("queries.getposts has an error");
        res.json(err);
      }
      else {
        console.log("queries.getposts succeeded " + posts.length);

        res.json(posts);
      }

    });
  }
});
router.get('/:Poster/myposts', function (req, res, next) {
  console.log("router got myposts call");

  Queries.getMyPosts(req.params.Poster,function (err, posts) {

    if (err) {
      console.log("error on getting posts for profile on posts route page");
      res.json(err);
    }
    else {
      console.log("success on getting posts for profile on posts route page ");
      console.log("poster is " + req.params.Poster);
      res.json(posts);
    }

  });
});
router.post('/', function (req, res, next) {
  var token = req.headers['authorization'].replace(/^Bearer\s/, '');
  console.log(token);

  console.log("received for title " + req.body.title);
  console.log("received for category" + req.body.category);
  var decoded = jwt.verify(token, 'NOTSECURELYSTORED');
  console.log("Id should be printed here hopefully: " + decoded.ID + " username: " + decoded.username + " image url: " + req.body.url);
  Queries.addPost(decoded.ID, req.body.title, req.body.content, req.body.category,decoded.username,req.body.url, function (err, post) {

    if (err) {
      console.log("add post error");
      res.json(err);

    }
    else {
      console.log("add post success")
      res.json(req.body.content);//or return count for 1 & 0
    }
  });
});
router.delete('/:id', function (req, res, next) {

  Queries.deletePost(req.params.id, function (err, count) {

    if (err) {
      console.log("error on deleting post from posts route page, id in paramater: " + req.params.id);
      res.json(err);
    }
    else {
      console.log("success on deleting post from posts route page");

      res.json(count);
    }

  });
});
router.get('/:category/posts', function (req, res, next) {
  console.log("router got category call");

  Queries.getPostsByCategory(req.params.category, function (err, count) {

    if (err) {
      console.log("error on getting posts by category from posts route page,category received is " + req.params.category);
      res.json(err);
    }
    else {
      console.log("success on getting posts by category from posts route page,category received is " + req.params.category);

      res.json(count);
    }

  });
});
router.get('/:id/replies', function (req, res, next) {
  console.log("router got replies call");

  Queries.getRepliesByPostID(req.params.id, function (err, replies) {

    if (err) {
      console.log("error on getting replies for posts on posts route page,id received is " + req.params.id);
      res.json(err);
    }
    else {
      console.log("success on getting replies for posts on posts route page,id received is " + req.params.id);

      res.json(replies);
    }

  });
});
router.get('/replies/all', function (req, res, next) {
  console.log("router got replies call");

  Queries.getAllReplies(function (err, replies) {

    if (err) {
      console.log("error on getting replies for posts on posts route page");
      res.json(err);
    }
    else {
      console.log("success on getting replies for posts on posts route page ");

      res.json(replies);
    }

  });
});
router.get('/:Poster/myreplies', function (req, res, next) {
  console.log("router got myreplies call");

  Queries.getMyReplies(req.params.Poster,function (err, replies) {

    if (err) {
      console.log("error on getting replies for profile on posts route page");
      res.json(err);
    }
    else {
      console.log("success on getting replies for profile on posts route page ");

      res.json(replies);
    }

  });
});
router.post('/:id/replies', function (req, res, next) {
  console.log("router got replies post call");

  var token = req.headers['authorization'].replace(/^Bearer\s/, '');
  console.log(JSON.stringify(req.headers));
  console.log(token);

  var decoded = jwt.verify(token, 'NOTSECURELYSTORED');
  console.log(req.body);
  console.log(req.body.reply);



  console.log("received for PosterID: " + decoded.ID);
  console.log("received for Username: " + decoded.username);

  console.log("received for content: " + req.body.reply);
  console.log("received for PostID: " + req.params.id);



  Queries.addReply(decoded.ID, req.params.id, req.body.reply, decoded.username, function (err, count) {

    if (err) {
      console.log("error on creating reply for posts on posts route page,id received is " + req.params.id + "content is " + req.body.reply);
      res.json(err);
    }
    else {
      console.log("success on creating reply for posts on posts route page,id received is " + req.params.id + "content is " + req.body.reply);

      res.json(count);
    }

  });
});
router.post('/:id/report', function (req, res, next) {
  console.log("router got report post call");

 



 

  Queries.reportPost(req.body.reporter, req.body.reported, req.params.id, function (err, count) {

    if (err) {
      console.log("error on creating report for posts on posts route page,id received is " + req.params.id + "reporter is " + req.body.reporter);
      res.json(err);
    }
    else {
      console.log("success on creating report for posts on posts route page,id received is " + req.params.id + "reporter is " + req.body.reporter);

      res.json(count);
    }

  });
});
router.post('/:id/report/reply', function (req, res, next) {
  console.log("router got report post call");







  Queries.reportReply(req.body.reporter, req.body.reported, req.params.id, function (err, count) {

    if (err) {
      console.log("error on creating report for replies on posts, id received is " + req.params.id + "reporter is " + req.body.reporter + " reported is " + req.body.reported);
      res.json(err);
    }
    else {
      console.log("success on creating report for replies on posts route page,id received is " + req.params.id + "reporter is " + req.body.reporter);

      res.json(count);
    }

  });
});
router.get('/posts/reported', function (req, res, next) {
  console.log("router got reported posts call");

  Queries.getReportedPosts(function (err, posts) {

    if (err) {
      console.log("error on getting reported posts on posts route page");
      res.json(err);
    }
    else {
      console.log("success on getting reported posts on posts route page");

      res.json(posts);
    }

  });
});
router.get('/replies/reported', function (req, res, next) {
  console.log("router got reported replies call");

  Queries.getReportedReplies(function (err, replies) {

    if (err) {
      console.log("error on getting reported replies on posts route page");
      res.json(err);
    }
    else {
      console.log("success on getting reported replies on posts route page");

      res.json(replies);
    }

  });
});


module.exports = router;
