var express = require('express');
var router = express.Router();
var Queries = require('../queries');
var bodyParser = require('body-parser');
var cors = require('cors');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cors());

router.get('/:id?',function(req,res,next){

if(req.params.id){

    Queries.getUserById(req.params.id,function(err,user){

        if(err)
        {
            res.json(err);
        }
        else{
            res.json(user);
        }
    });
}
else{

    Queries.getUsers(function(err,users){

        if(err)
        {
            console.log("error on get users");
            res.json(err);
        }
        else
        {
        	console.log("getUsers return this " + users);
            res.json(users);
        }
 
    });
}
});
router.post('/user/',function(req,res,next){

	

    var passwordToSave = bcrypt.hashSync(req.body.Password, salt);
        Queries.addUser(req.body.Username,passwordToSave,req.body.Email,req.body.Country,req.body.Language,function(err,post){

            console.log("received " + req.body.content);
            if(err)
            {
                res.json(err);

            }
            else{
                    res.json(req.body.content);//or return count for 1 & 0
            }
        });
});
router.delete('/user/:id',function(req,res,next){

        Queries.deletePost(req.params.id,function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(count);
            }

        });
});
router.get('/login',function(req,res,next){

        Queries.checkPassword(req.params.Username,bcrypt.hashSync(req.params.Password, salt),function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(count);
            }

        });
});
module.exports=router;