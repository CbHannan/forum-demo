CREATE DATABASE IF NOT EXISTS socialdb;
 
USE socialdb;

CREATE TABLE Users (
    UserID int not null auto_increment,
    Username varchar(255) not null,
    Password binary(60),
    Email varchar(255) not null,
    PRIMARY KEY (UserID)
    
);
CREATE TABLE Posts (
    PostID int not null auto_increment,
    PosterID int NOT NULL,
    Title varchar(255) not null,
    Content varchar(4000) not null,
    Category varchar(40),
    CreatedAt DateTime,
    PRIMARY KEY (PostID),
    CONSTRAINT FK_UserPost FOREIGN KEY (PosterID)
    REFERENCES Users(UserID)
);
CREATE TABLE Replies (
    ReplyID int not null auto_increment,
    ReplierId int not null,
    PostID int not null,
    Content varchar(4000) not null,
    RepliedAt DateTime,
    PRIMARY KEY (ReplyID),
    CONSTRAINT FK_UserReply FOREIGN KEY (ReplierID)
    REFERENCES Users(UserID)
);
CREATE TABLE Conversations (
    ConversationID int not null auto_increment,
    ConversationName varchar(100) not null,
    UsersAllowed int,
    CreatorID int not null,
    CreatedAt DateTime,
    PRIMARY KEY (ConversationID),
    CONSTRAINT FK_ConversationCreator FOREIGN KEY (CreatorID)
    REFERENCES Users(UserID)
);
CREATE TABLE ConversationMembers (
    ConversationsMemberID int not null auto_increment,
    ConversationID int not null,
    UserID int not null,
    AddedAt DateTime,
    PRIMARY KEY (ConversationsMemberID),
    CONSTRAINT FK_ConversationUser FOREIGN KEY (UserID)
    REFERENCES Users(UserID),
    CONSTRAINT FK_ConservationRoom FOREIGN KEY (ConversationID)
    REFERENCES Conversations(ConversationID)
);
CREATE TABLE Messages (
    MessageID int not null auto_increment,
    Content varchar(4000) not null,
    UserID int not null,
    ConversationID int not null,
    SentAt DateTime,
    PRIMARY KEY (MessageID),
    CONSTRAINT FK_UserCreated FOREIGN KEY (UserID)
    REFERENCES Users(UserID),
    CONSTRAINT FK_UserConservation FOREIGN KEY (ConversationID)
    REFERENCES Conversations(ConversationID)
);
