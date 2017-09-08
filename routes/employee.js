var Client = require('node-rest-client').Client;
var client = new Client();
var jexcel=require('json2excel');

//Get employees
exports.getEmployeesById = function(req, res){
	var sheets = [];
	var url = "http://localhost:4000/api/grades/"+req.body.select+"/employees";
	if(req.body.select === 'allGrades'){
		url = 'http://localhost:4000/api/employees';
	}
	client.get(url, function (data, response) {
	    
	    //Make excel file
	    let set = new Set();
	    data.employees.forEach(function(employee){
	    	set.add(employee.grade);
	    });
	    
	    var sheets = [];
	    var arr = Array.from(set);
	    for(var i = 0; i < arr.length; i++){
	    	var empItems = [];
		    data.employees.forEach(function(employee){ 	
		    	if(employee.grade === arr[i]){
		    		empItems.push(employee);
		    	}
		    });
	    	let sheet = {
		            header: {
		                'name': 'name',
		                'email': 'email',
		                'grade': 'grade'
		            },
		            items: empItems,
		            sheetName: arr[i]
		    };
		    sheets.push(sheet);
	    }
	    var datas = {
	    	sheets: sheets,
	    	filepath: 'employees.xlsx'
	    };
	    jexcel.j2e(datas,function(err){ 
	        console.log('finish')
	    });
	    
	    //Send email
	        // create reusable transporter object using the default SMTP transport
	    var smtpTransport = nodemailer.createTransport({
	        	service: 'Gmail',
	            auth: {
	                user: 'vicestopinan@gmail.com', // generated ethereal user
	                pass: 'mofeta1959'  // generated ethereal password
	            }
	        });

	        // setup email data with unicode symbols
	   let mailOptions = {
	       from: 'vicestopinan@gmail.com', // sender address
	       to: 'vicestopinan@yahoo.com', // list of receivers
	       subject: 'Hello',
	       text: 'C:\\Users\\Butofamily\\Documents\\NodejsDemo\\employee-details-client\\employees.xlsx'
	   };

	        // send mail with defined transport object
	    smtpTransport.sendMail(mailOptions, function(error, response){
	            if (error) {
	                return console.log(error);
	            } else {
	            	res.redirect('/');
	            }
	    });
	});
	 res.send("respond with a resource");
}
