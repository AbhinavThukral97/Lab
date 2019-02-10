var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		minlength: 1,
		unique: true
	},
	description:{
		type: String,
		required: true,
		minlength: 1
	},
	date:{
		type: String,
		required: true,
		minlength: 1
	},
	status:{
		type: String,
		required: true,
		minlength: 1
	},
	tags:{
		type: String,
		required: true,
		minlength: 1
	},
	client:{
		type: String
	},
	page:{
		type: String
	},
	link:{
		type: String
	},
	imagePath:{
		type: String
	},
	comments:{
		type: String
	}
});

var project = mongoose.model('project',projectSchema);

module.exports = {project};