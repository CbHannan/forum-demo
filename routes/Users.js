var express = require('express');
var router = express.Router();
var Queries = require('../queries');
var bodyParser = require('body-parser');
var cors = require('cors');
var bcrypt = require('bcrypt');
var db = require('../dbconnection');
var nodemailer = require("nodemailer");


jwt = require("jsonwebtoken");
var salt = bcrypt.genSaltSync(10);
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "Savannah.Forum@gmail.com",
    pass: "Crossings"
  }
});
var rand, resetRand, mailOptions, host, link, resetLink, username, password;


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cors());

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {

    Queries.getUserById(req.params.id, function (err, user) {

      if (err) {
        res.json(err);
      }
      else {
        res.json(user);
      }
    });
  }
  else {

    Queries.getUsers(function (err, users) {

      if (err) {
        console.log("error on get users");
        res.json(err);
      }
      else {
        console.log("getUsers return this " + users);
        res.json(users);
      }

    });
  }
});
router.get('/username/:Username', function (req, res, next) {

  Queries.getUserByUsername(req.params.Username, function (err, user) {

    if (err) {
      console.log('error on user by username')
      res.json(err);
    }
    else {
      console.log('success on user by username')

      res.json(user);
    }


  });
});
router.post('/', function (req, res, next) {
  console.log("Username =  " + req.body.username + " Password =  " + req.body.password + " Email =  " + req.body.email);
  username = req.body.username;
  password = req.body.password;


  rand = Math.floor((Math.random() * 100) + 54);
  host = req.get('host');
  link = "http://" + req.get('host') + "/login/" + rand;
  mailOptions = {
    to: req.body.email,
    subject: "Please confirm your Email account",
    html: "Hello " + req.body.username + ",<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  }
  console.log(mailOptions);


  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log("Message sent: " + response.message);
      res.json(response);
    }
  });

});
router.post('/reset/password', function (req, res, next) {
  console.log("Username =  " + req.body.username + " Email =  " + req.body.email);
  username = req.body.username;


  resetRand = Math.floor((Math.random() * 100) + 24);
  host = req.get('host');
  resetLink = "http://" + req.get('host') + "/reset/" + resetRand;
  mailOptions = {
    to: req.body.email,
    subject: "Password Reset Request",
    html: "Hello " + req.body.username + ",<br> Please click on the link to reset your password.<br><a href=" + resetLink + ">Click here to verify</a>"
  }
  console.log(mailOptions);


  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log("Message sent: " + response.message);
      res.json(response);
    }
  });

});
router.put('/reset/password/:id', function (req, res, next) {
  console.log(req.protocol + ":/" + req.get('host'));
  console.log("router received " + req.body.username + " password " + req.body.password);


  console.log("inside service, checkpassword received Username = " + req.body.username + " Password= " + req.body.password);
  var passwordToSave = bcrypt.hashSync(req.body.password, salt);
  console.log('rand = ' + resetRand + ' username = ' + username + 'pass' + password);


  if (req.params.id == resetRand) {
    console.log("id matched");
    Queries.updatePassword(req.body.username, passwordToSave, function (err, user) {

      if (err) {
        res.json(err);
        console.log("error on adduser");

      }
      else {
        console.log('success on password reset')

        res.json(user);
      }
     
    });



  }








});

  router.post('/verify/:id', function (req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    console.log("router received " + req.body.username + " password " + req.body.password);


    console.log("inside service, checkpassword received Username = " + req.body.username + " Password= " + req.body.password);
    var passwordToSave = bcrypt.hashSync(req.body.password, salt);
    console.log('rand = ' + rand + ' username = ' + username + 'pass' + password);
    
         
            if (req.params.id == rand && req.body.username == username && req.body.password == password) {
              console.log("email is verified");
              Queries.addUser(req.body.username, passwordToSave, req.body.email, function (err, user) {

                if (err) {
                  res.json(err);
                  console.log("error on adduser");

                }
                else {
                  

                  db.query("Select * FROM Users WHERE Username =?",
                    [req.body.username],
                    function (err, rows) {

                      if (rows.length == 0) {
                        console.log("checkPassword 1 received an error for Username: " + req.body.username + " + password: " + req.body.password);
                        res.status(500).send('Something broke!')
                        return;
                      }

                      if (rows[0].Password.length == 0) {
                        console.log("checkPassword 2 received an error for Username: " + req.body.username + " + password: " + req.body.password);
                        res.status(500).send('Something broke!')
                      }
                      if (bcrypt.compareSync(req.body.password, rows[0].Password)) {
                        console.log("success,password hashes matched, user ID = " + rows[0].UserID + ", access= " + rows[0].access);


                        res.json({
                          token: jwt.sign({ username: req.body.username, ID: rows[0].UserID, Access: rows[0].access }, 'NOTSECURELYSTORED')

                        })
                      }
                      else {
                        console.log("checkPassword 3 received incorrect username and password for Username: " + req.body.username + " + password: " + req.body.password);
                        res.status(501)
                      }


                    });
              
                  console.log("adduserworks?");
                }
              });

              

            }
            
 
         
          
      


   
  });
router.delete('/:id', function (req, res, next) {

  Queries.deleteUser(req.params.id, function (err, count) {

    if (err) {
      console.log("users route error");
      res.json(err);
    }
    else {
      console.log("received " + req.params.id);
      res.json(count);
    }

  });
});
router.post('/login', function (req, res, next) {
  console.log("router received " + req.body.username + " password " + req.body.password);


  console.log("inside service, checkpassword received Username = " + req.body.username + " Password= " + req.body.password);

  db.query("Select * FROM Users WHERE Username =?",
    [req.body.username],
    function (err, rows) {

      if (rows.length == 0) {
        console.log("checkPassword 1 received an error for Username: " + req.body.username + " + password: " + req.body.password);
        res.status(500).send('Something broke!')
        return;
      }

      if (rows[0].Password.length == 0) {
        console.log("checkPassword 2 received an error for Username: " + req.body.username + " + password: " + req.body.password);
        res.status(500).send('Something broke!')
      }
      if (bcrypt.compareSync(req.body.password, rows[0].Password)) {
        console.log("success,password hashes matched, user ID = " + rows[0].UserID + ", access= " + rows[0].access);


        res.json({
          token: jwt.sign({ username: req.body.username, ID: rows[0].UserID, Access: rows[0].access }, 'NOTSECURELYSTORED')

        })
      }
      else {
        console.log("checkPassword 3 received incorrect username and password for Username: " + req.body.username + " + password: " + req.body.password);
        res.status(501)
      }


    });

});



//     Queries.checkPassword(req.body.username, req.body.password, function (err, passwordMatch) {
//        console.log(passwordmatch);
//        if (err) {
//        console.log("error, received " + req.body.username + "password " + req.body.password);
//        res.json(err);
//      }
//      else {
//      console.log("success, received " + req.body.username + "password " + req.body.password);
//      res.json({
//        token: jwt.sign({ email: user.Email, username: user.Username, id: user.UserID }, 'NOTSECURELYSTORED')
//       });
//       }
//
//      });
//});
router.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
}
module.exports = router;
