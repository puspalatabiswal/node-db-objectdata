var mongoose = require ("mongoose");
var empSchema = mongoose.Schema({

 name: {
        fname: Object,
        lname: { type: Object, trim: true } 
        
      },

age:{
      type: Number ,
      required :true
    },

mob:{
     type: String ,
     required :true
    }

})




var Emp = module.exports = mongoose.model("emp" ,empSchema ,"emp" )

//getting the data
module.exports.getEmp = function(callback){
	return Emp.find(callback)
}

//putting the data
module.exports.createEmp = function(empObj , callback){
return Emp.create(empObj,callback)	
}



//delete the data
module.exports.deleteEmp =function(id , callback){
  return Emp.remove({_id:id},callback)
}


//edit the data as per the field 

module.exports.editEmp =function(id,empObj,callback){
	return Emp.update({_id :id},
		                    {$set : {
                                   name :{
                                        fname : empObj.fname,
                                        lname : empObj.lname
                                       },

                                
                                  age : empObj.age,
                                  mob : empObj.mob
                                 
		                    }},callback)
}




//edit the data as per the field 
module.exports.getEmpById = function(userId,callback){
return Emp.findById({_id:userId},callback)
}