const bcrypt = require('bcryptjs');

var pass = "hello";

bcrypt.genSalt(10,( err,salt)=>{
	bcrypt.hash(pass,salt, (err,hash)=>{
		console.log(hash);
	});
});

var hashedPassword = '$2a$10$y2Q.Y1XmWWVxHlCOkDj/DO1hbRL8GCRin.DQFQp.LKCUPFG73.jI2'

bcrypt.compare(pass,hashedPassword, (err,res)=>{
	console.log(res);
});