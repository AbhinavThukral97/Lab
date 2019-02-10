const {mongoose} = require('./../server/database/mongoose');
const {project} = require('./../server/models/project');

project.updateOne({name: 'four'},{name: 'one',description: 'abcdefg'},{}, (err, res)=>{
	if(err)
		console.log(err);
	else
		console.log(res);
});