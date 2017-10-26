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

    Queries.getPostById(req.params.id,function(err,post){

        if(err)
        {
            res.json(err);
       }
        else{
            res.json(post);
        }
    });
}
else{

    Queries.getPosts(function(err,posts){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(posts);
        }
 
    });
}
});
router.post('/',function(req,res,next){

        Queries.addPost(req.body.PosterID,req.body.title,req.body.content,req.body.category,function(err,post){

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
router.delete('/:id',function(req,res,next){

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
module.exports=router;