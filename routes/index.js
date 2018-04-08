// add all routes here
module.exports = function(app){
  //auth route
  module.exports = require('./auth.js')(app);

  // api-admin routes
  module.exports = require('../api-admin/routes/index')(app);
}
