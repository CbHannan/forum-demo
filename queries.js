var db=require('./dbconnection');
var bcrypt= require('bcrypt');

var Queries={

getUsers:function(callback){

  return db.query("Select * from Users",callback);
  console.log("get users ran");


},
getUserById:function(id,callback){

    return db.query("Select * FROM Users WHERE UserID=?",[id],callback);
},
addUser:function(User,callback){
   console.log("inside service");
   console.log(Users.Username);
  return db.query("Insert into Users (Username,Password,Email,Country,Language) values(?)",[Username, Password, Email, Country, Language],callback);
},
deleteUser:function(id,callback){
    return db.query("Delete FROM Users WHERE UserID=?",[id],callback);
},
checkPassword:function(Username,Password,callback){
    return db.query("SELECT * FROM Users WHERE Username = ?",
    [usernameEnteredByUser],
    function(err, rows) {
        if (err) {
            return done(err);
        }

        if (Password === rows[0].Password) {
          // Yay, it worked!
        }
});

},
getPosts:function(callback){

return db.query("Select * FROM Posts",callback);

},
getPostById:function(id,callback){

    return db.query("select * FROM Posts WHERE PostID=?",[id],callback);
},
addPost:function(callback){
   console.log("inside service");
   console.log(Posts.Title);
return db.query("Insert into Posts (PosterID,Title,Content,Category) values(?)",[UserID, Title, Content, Category],callback);
},
deletePost:function(id,callback){
    return db.query("delete from Posts where UserID=?",[id],callback);
},
getRepliesByPostID:function(callback){

return db.query("Select * from Replies where PostID=?",[postID],callback);

},
getRepliesByReplyID:function(id,callback){

    return db.query("select * from Replies where ReplyID=?",[ReplyID],callback);
},
addReply:function(callback){
   console.log("inside service");
   console.log(Posts.Title);
return db.query("Insert into Replies (ReplierID,PostID,Content) values(?)",[UserID, PostID, Content],callback);
},
deleteReply:function(id,callback){
    return db.query("delete from Replies where ReplyID=?",[Replyid],callback);
}


};
module.exports=Queries;