var NewInternship = require('../models/newInternship')l
module.exports = function(app){

	// Add new internship
	app.get('/add-new-internship', function(req, res){
    var newInternship = new NewInternship();

    newInternship.titleOfInternship = req.body.titleOfInternship;
//Field need to be added
    newInternship.save(function(err) {
        if (err)
            throw err;
            return done(null, newInternship);
    });

    res.send('Data received:\n' + JSON.stringify(req.body));
	});

}
