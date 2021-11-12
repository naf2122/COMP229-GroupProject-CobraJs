let mongoose = require('mongoose');

// create a model class
let Surveys = mongoose.Schema({
    'Question 1': String,
    'Response 1': String,
    'Response 2': String,
    'Response 3': String
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Surveys', Surveys);