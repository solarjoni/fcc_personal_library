/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

let mongodb = require('mongodb')
let mongoose = require('mongoose')

module.exports = function (app) {

let uri = 'mongodb+srv://new-user:' + process.env.PW + '@cluster0.2cqnt.mongodb.net/fcc_personal_library?retryWrites=true&w=majority'

  mongoose.connect(uri, { useNewUrlPArser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1} )

  let bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    comments: [String]
  })

  let Book = mongoose.model('Book', bookSchema)

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if(!title){
        return res.json("missing required field title")
      }
      //response will contain new book object including atleast _id and title
      let newBook = new Book({
        title: title,
        comments: []
      })
      newBook.save((error, savedBook) => {
        if(!error && savedBook) {
          res.json(savedBook)
        }
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
