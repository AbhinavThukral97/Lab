const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var adminSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		unique: true,
		minlength: 1
	},
	email:{
		type: String,
		required: true,
		unique: true,
		minlength: 1
	},
	password:{
		type: String,
		required: true,
		minlength: 6
	}
});

adminSchema.statics.verifyCreds = function(username,pass){
	var admin = this;
	return admin.findOne({user: username}).then((user)=>{
		if(!user){
			return Promise.reject();
		}

		return new Promise((resolve,reject)=>{
			bcrypt.compare(pass,user.password, (err,res)=>{
				if(res){
					resolve({message: 'Success!'});
				}
				else{
					reject();
				}
			});
		});
	});
};

adminSchema.pre('save',function(next){
	var user = this;
	bcrypt.genSalt(10,( err,salt)=>{
		bcrypt.hash(user.password,salt, (err,hash)=>{
			user.password = hash;
			next();
		});
	});
});

var admin = mongoose.model('admin',adminSchema);

module.exports = {admin};