const express = require('express'); 
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const _ = require('lodash');

const {mongoose} = require('./database/mongoose');
const {project} = require('./models/project');
const {admin} = require('./models/admin');

const app = express();
const port = process.env.PORT || 4200

app.set('view engine','hbs');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +  '/../public'));
app.use(express.static(__dirname +  '/../public/css'));
app.use(express.static(__dirname +  '/../public/js'));

app.get('/',(req,res)=>{
	project.find().then((file)=>{
		res.render('index.hbs',{projects: file});
	});
});

app.get('/setup',(req,res)=>{
	res.render('setup.hbs',res);
});

app.post('/setup',(req,res)=>{
	var body = _.pick(req.body, ['user','email','password']);
	var user = new admin(body);
	user.save().then((user)=>{
		res.render('setup.hbs',{success: `${user.user} was created`});
	}).catch((e)=>{
		res.status(400).render('setup.hbs',{error: `Error: ${e}`});
	});
});

app.get('/add',(req,res)=>{
	res.render('add.hbs',res);
});

app.post('/add',(req,res)=>{
	var creds = _.pick(req.body,['password']);
	var body = _.pick(req.body, ['name','description','date','status','tags','client','page','link','imagePath','comments']);
	admin.verifyCreds('admin',creds.password).then((message)=>{

		var file = new project(body);
		file.save().then((file)=>{
			res.render('add.hbs',{success: `${file.name} was added to Projects`});
		}).catch((e)=>{
			res.status(400).render('message.hbs',{title: 'Project Addition Error',message: `Error: ${e}`});
		});

	}).catch((e)=>{
		res.render('add.hbs',{error: 'Incorrect Credentials'});
	});

});

app.get('/edit/:id',(req,res)=>{
	project.findOne({name: req.params.id}).then((doc)=>{
		if(doc)
			res.render('edit.hbs',{project: doc});
		else
			res.render('message.hbs',{title: '404',message: 'Project Not Found'});
	}).catch((e)=>{
		res.status(400).render('message.hbs',{title: 'Request Error',message: e});
	});
});

app.post('/edit/:id',(req,res)=>{
	var creds = _.pick(req.body,['password']);
	var body = _.pick(req.body, ['name','description','date','status','tags','client','page','link','imagePath','comments']);
	admin.verifyCreds('admin',creds.password).then((message)=>{
		
		project.updateOne({name: req.params.id},body,{},(error,response)=>{
			if(error){
				res.status(400).render('message.hbs',{title: 'Project Updation Error',message: `Error: ${e}`});
			}
			else{
				res.render('edit.hbs',{project: body, success: `${body.name} was edited`});
			}
		});

	}).catch((e)=>{
		res.render('edit.hbs',{project: body, error: 'Incorrect Credentials'});
	});
});

app.get('/project/:id',(req,res)=>{
	project.findOne({name: req.params.id}).then((doc)=>{
		if(doc)
			res.render('project.hbs',doc);
		else
			res.render('message.hbs',{title: '404',message: 'Project Not Found'});
	}).catch((e)=>{
		res.status(400).render('message.hbs',{title: 'Request Error',message: e});
	});
});

app.post('/delete/:id',(req,res)=>{
	var creds = _.pick(req.body,['password']);
	admin.verifyCreds('admin',creds.password).then((message)=>{
		
		project.remove({name: req.params.id},(error,response)=>{
			if(error){
				res.status(400).render('message.hbs',{title: 'Project Deletion Error',message: `Error: ${e}`});
			}
			else{
				res.render('message.hbs',{title: `${req.params.id} was deleted`, message: 'Project successfully deleted'});
			}
		});

	}).catch((e)=>{
		res.render('message.hbs',{title: 'Project Deletion Error',message: `Denied due to incorrect credentials`});
	});
});

app.get('/share/:id',(req,res)=>{
	project.findOne({name: req.params.id}).then((doc)=>{
		if(doc){
			res.send(doc);
		}
		else
			res.status(200).send({error: 'Project does not exist.'});
	}).catch((e)=>{
		res.status(400).send({error: 'Request Error'});
	});
});

app.get('/everything',(req,res)=>{
	project.find().then((doc)=>{
		if(doc){
			res.send(doc);
		}
		else
			res.status(200).send({error: 'Empty Database'});
	}).catch((e)=>{
		res.status(400).send({error: 'Request Error'});
	});
});

app.listen(port, ()=>{
	console.log(`Started on port ${port}`);
});