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
getUserByUsername: function (username, callback) {

  return db.query("Select * FROM Users WHERE Username=?", [username], callback);
},
addUser:function(Username,Password,Email,callback){
  console.log("inside service, received Username = " + Username + " Password= " + Password + " Email= " + Email);
  console.log(Password.length);
  return db.query("Insert into Users (Username,Password,Email) values (?,?,?)",[Username, Password, Email],callback);
},
deleteUser:function(id,callback){
    return db.query("Delete FROM Users WHERE UserID=?",[id],callback);
},
  updatePassword: function (Username,Password, callback) {
    return db.query("UPDATE Users SET Password=? WHERE Username=?", [Password, Username], callback);
  }
//  ,
//checkPassword:function(Username,Password,callback){
  //console.log("inside service, checkpassword received Username = " + Username + " Password= " + Password);

 // return db.query("Select * FROM Users WHERE Username =?",
   // [Username],
 //   function(err, rows) {
 //     var passwordMatch = false;

 //       if (err) {
   //       console.log("checkPassword received Username: " + Username + " + password: " + password);
    //      return done(err);
   //     }

     //   if (bcrypt.compareSync(Password, rows[0].Password))
     //    {
      //    console.log("success,password hashes matched");

  //        passwordMatch = true;
//          return;
    //    }
      //  else {
       //   return response.json({ success: false, message: 'passwords do not match' });
      //    console.log("password didnt match");
       // }

       
//});

  //}
  ,
getPosts:function(callback){

  return db.query("SELECT posts.Title, posts.PostID, posts.PosterID, posts.Content, posts.Category, posts.PosterUsername, posts.thumbnail, posts.timestamp,SUM(CASE WHEN posts.PostID = replies.PostID THEN 1 END) AS reply_count FROM posts LEFT JOIN replies on posts.PostID = replies.PostID GROUP BY posts.PostID ORDER BY PostID DESC",callback);

},
getMyPosts: function (Poster,callback) {

  return db.query("SELECT posts.Title, posts.PostID, posts.PosterID, posts.Content, posts.Category, posts.PosterUsername, posts.thumbnail, posts.timestamp,SUM(CASE WHEN posts.PostID = replies.PostID THEN 1 END) AS reply_count FROM posts LEFT JOIN replies on posts.PostID = replies.PostID WHERE posts.PosterUsername=? GROUP BY posts.PostID ORDER BY PostID DESC",[Poster], callback);

},
getPostById:function(id,callback){

    return db.query("select * FROM Posts WHERE PostID=?",[id],callback);
},
getPostsByCategory: function (Category, callback) {

  return db.query("SELECT posts.Title, posts.PostID, posts.PosterID, posts.Content, posts.Category, posts.PosterUsername, posts.thumbnail, posts.timestamp,SUM(CASE WHEN posts.PostID = replies.PostID THEN 1 END) AS reply_count FROM posts LEFT JOIN replies on posts.PostID = replies.PostID WHERE Category=? GROUP BY posts.PostID ORDER BY PostID DESC" , [Category], callback);
},
  addPost: function (PosterID,Title,Content,Category,PosterUsername,thumbnail,callback){
   console.log("inside service in queries page, title is :" + Title + " and content is " + Content);
   return db.query("Insert into Posts (PosterID,Title,Content,Category,PosterUsername,thumbnail) values(?,?,?,?,?,?)", [PosterID, Title, Content, Category, PosterUsername,thumbnail],callback);
},
  deletePost: function (id, callback) {
    console.log("queries delete ran and received " + id);
    return db.query("delete from Posts where PostID=?",[id],callback);
  },
  reportPost: function (Reporter,Reported,id, callback) {
    console.log("queries report post ran and received " + id);
    return db.query("Insert into reportedposts (ReporterID,ReportedID,PostID) values (?,?,?)", [Reporter, Reported,id], callback);
  },
  reportReply: function (Reporter, Reported,id, callback) {
    console.log("queries report reply ran and received " + id);
    return db.query("Insert into reportedReplies (ReporterID,ReportedID,ReplyID) values (?,?,?)", [Reporter, Reported, id], callback);
  },
  getReportedPosts: function (callback) {
    console.log("queries get reported posts ran");
    return db.query("SELECT reportedPosts.PostID, reportedPosts.ReporterID, reportedPosts.ReportedID,posts.Title,posts.Content FROM reportedPosts INNER JOIN posts ON reportedPosts.PostID=posts.PostID  ORDER BY PostID DESC", callback);
  },

getRepliesByPostID:function(postID,callback){
  console.log("queries page called getrepliesbypostid");
return db.query("Select * from Replies where PostID=? ORDER BY ReplyID DESC",[postID],callback);

  },
getAllReplies:function(callback) {
  console.log("queries page called getallreplies");
  return db.query("Select * from Replies", callback);

},
getMyReplies: function (Poster,callback) {
  console.log("queries page called getmyreplies");
  return db.query("Select * from Replies WHERE Username=? ORDER BY ReplyID DESC",[Poster], callback);

},
getRepliesByReplyID:function(id,callback){

    return db.query("select * from Replies where ReplyID=?",[ReplyID],callback);
},
getReportedReplies: function (callback) {
  console.log("queries get reported posts ran");
  return db.query("SELECT reportedReplies.ReplyID, reportedReplies.ReporterID, reportedReplies.ReportedID,replies.PostID,replies.Content FROM reportedReplies INNER JOIN replies ON reportedReplies.ReplyID=replies.ReplyID", callback);
},
addReply:function(UserID, PostID, Content, Username, callback){
   console.log("inside service");
   console.log(UserID + " " + PostID+ " " + Content);
return db.query("Insert into Replies (ReplierID,PostID,Content,Username) values(?,?,?,?)",[UserID, PostID, Content, Username],callback);
},
deleteReply:function(id,callback){
    return db.query("delete from Replies where ReplyID=?",[Replyid],callback);
},
getCategories: function (callback) {
  return db.query("Select * FROM Category ORDER BY CategoryName", callback);
},
getCategoriesToPost: function (callback) {
  return db.query("Select * FROM Category WHERE CategoryID <> 8 ORDER BY CategoryName", callback);
},
getCategoryByID: function (id,callback) {
  return db.query("Select * FROM Category where CategoryID=?",[id], callback);
}

};
module.exports=Queries;
