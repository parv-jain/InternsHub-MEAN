
var mongoose = require('mongoose');

module.exports = mongoose.model('NewInternship',{
	titleOfInternship: String,
	location: String,
	category: String,
	paid_unpaid: String,
  stipend: String,
  duration: String,
  questionToSolve: String
});
