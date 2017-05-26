var express = require ("express");
var app = express();

var router = express.Router();
var mongoose = require ("mongoose");
var Emp = require("./models/emp");
var bodyParser = require("body-parser");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


mongoose.connect("mongodb://localhost/techminds" , function(){
	console.log("connected db successfully !!!");
})



//getting the data
router.get("/emp" , function(req,res){
	Emp.getEmp(function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})
})


//putting the data

router.post("/emp1" , function(req,res){
	var empObj = req.body;

	Emp.createEmp(empObj,function(err,custData){
		if(err){
			throw err;
		}
		res.json(custData);
	})
})

//edit the data


router.put("/emp2/:id",function(req,res){
	var userId = req.params.id;
		var dataFromPostMan = req.body;
Emp.getEmpById(userId,function(err , dataFormDB){
	if(err){
		throw err;
	}

	var bodyObj = {
		

         fname : dataFromPostMan.fname || dataFormDB.name.fname,
		  lname : dataFromPostMan.lname || dataFormDB.name.lname ,  
	
		age : dataFromPostMan.age || dataFormDB.age,
		mob : dataFromPostMan.mob || dataFormDB.mob
		
       }

	Emp.editEmp(userId,bodyObj,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})
});
})


//delete the data

router.delete("/emp3/:id" , function(req,res){
var userId = req.params.id;
Emp.deleteEmp(userId,function(err , empoData){
if(err){
	throw err;
}
res.json(empoData);


})
})





app.use("/api" , router);
var PORT = process.env.PORT ||4003 ;
app.listen(PORT , function(){
	console.log("port is"+PORT);

})




