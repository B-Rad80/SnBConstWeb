const express = require('express');
const Joi = require("@hapi/hapi");
const path = require('path');
const fmail = require('./JS/Mail.js');

const app = express();

console.log(fmail.Mailer);


base_path = '/industrie/'
app.use(express.urlencoded({ extended: true })); //html forms
//app.use(express.json());       //api calls
app.use(express.static('industrie'));
//HOME PAGE

//////////////////ROUTING 'N STUFF///////////////////
app.get('/', (req, res) => {
  res.sendFile(base_path + 'services.html', {
      root: path.join(__dirname, './')
  })
});

//About
app.get('/about', (req, res) => {
    res.sendFile(base_path +'about.html', {
        root: path.join(__dirname, './')
    });
})
//news
app.get('/news', (req, res) => {
    res.sendFile(base_path +'news.html', {
        root: path.join(__dirname, './')
    });
})
app.get('/services', (req, res) => {
    res.sendFile(base_path +'services.html', {
        root: path.join(__dirname, './')
    });
})
app.get('/contact', (req, res) => {
    res.sendFile(base_path +'contact.html', {
        root: path.join(__dirname, './')
    });
})


//SEND INFO PAGE WITH RESPONSE?????
//CONTACT ME POPUP
app.post('/contact', (req, res) => {

  const { error } = validateEmail(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }
  console.log(req.body.message)
  fmail.Mailer(req.body.name,req.body.email, req.body.message);
  res.sendFile(base_path +'contact.html', {
      root: path.join(__dirname, './')
  });

});
//////////////////VALIDATION///////////////////
//EMAIL
function validateEmail(item){
  const schema = {
    email: Joi.string().email().required(),
    message: Joi.string().min(1).required(),
    name: Joi.string().max(2000).required()
  };

  return Joi.validate(item, schema);
}
////////////////////PORT STUFF///////////////////
//env variable set outside application ex PORT
const port = process.env.PORT || 8080;
app.listen(port, ()=> {
  console.log(`listening on port ${port}...`)
});
