/*
*
*
*       Complete the API routing below
*       
*       
*/
'use strict';
const findBooksArr = require('../mongoose.js').findBooksArr;
const addBook = require('../mongoose.js').addBook;
const deleteAll = require('../mongoose.js').deleteAll;
const findBook = require('../mongoose.js').findBook;
const addComment = require('../mongoose.js').addComment;
const deleteOne = require('../mongoose.js').deleteOne;
module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      findBooksArr((err, data) => {
        if (err) return console.error(err);
        res.json(data);
      });
    })
    
    .post(function (req, res, next){
      if (req.params.id) return next();
      let title = req.body.title;
      if (!title) return res.send('missing required field title');
      addBook(title, (err, data) => {
        if (err) return console.error(err);
        res.json({title: data.title, _id: data._id});
      });
    })
    
    .delete(function(req, res){
      deleteAll(err => {
        if (err) return console.error(err);
        res.send('complete delete successful');
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      findBook(bookid, (err, data) => {
        if (err) return console.error(err);
        if (!data) return res.send('no book exists');
        res.json({_id: data._id, title: data.title, comments: data.comments});
      });
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) return res.send('missing required field comment');
      addComment(bookid, comment, (err, data) => {
        if (err) return console.error(err);
        if (!data) return res.send('no book exists');
        res.json(data);
      });
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      deleteOne(bookid, (err, data) => {
        if (err) return console.error(err);
        if (!data) return res.send('no book exists');
        res.send('delete successful');
      });
    });
  
};