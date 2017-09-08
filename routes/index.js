
/*
 * GET home page.
 */
var Client = require('node-rest-client').Client;
 
var client = new Client();
var grades = [];

//Get grades
client.get("http://localhost:4000/api/grades", function (data, response) {
    console.log(data);
    grades = data.grades;
});


exports.index = function(req, res){
  res.render('index', { grades: grades});
};

