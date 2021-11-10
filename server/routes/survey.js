
/*!--COMP229-W2021-MidTerm-30088273
Nicholas Contini
300882373
*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/survey');

/* GET survey List page. READ */
router.get('/', (req, res, next) => {
  // find all survey in the survey collection
  book.find( (err, survey) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('survey/index', {
        title: 'survey',
        survey: survey
      });
    }
  });

});

//  GET the Book Details page in order to create a survey
router.get('/add', (req, res, next) => {
  res.render('survey/details', { title: 'Create a Survey', survey: {}});
});

// POST process the Book Details page and create a new survey - CREATE
router.post('/add', (req, res, next) => {
  //create new book
    let newBook = book ({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre,
    });
//pass new book to create function
    book.create(newBook, (err, book) =>
    {
      if (err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.redirect('/survey');
      }
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;
//get book id in order to edit it
  book.findById(id, (err, bookToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.render('survey/details', {title: 'Edit Book', survey: bookToEdit})
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id
//create "new" book that's actually just the edited book
//and pass to book db
  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre,
  });

  book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {

          res.redirect('/survey');
      }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
//delete the specific book, found by id
  book.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {

           res.redirect('/survey');
      }
  });
});


module.exports = router;
