const express = require('express');
const Joi = require("@hapi/joi");
const path = require('path');
const fmail = require('./JS/Mail.js');
const jsrender = require('jsrender');
const app = express();

//console.log(fmail.Mailer);

app.engine('html', jsrender.__express); // Set JsRender as template engine for .html files
app.set('view engine', 'html');

base_path = '/industrie/'
app.set('views', __dirname + base_path); // Folder location for JsRender templates for Express

app.use(express.urlencoded({ extended: true })); //html forms
app.use(express.static('industrie'));
//HOME PAGE

//////////////////ROUTING 'N STUFF///////////////////
app.get('/', (req, res) => {
    res.render('services.html', { name: "Jim" });
});

//About
app.get('/about', (req, res) => {
    res.render('about.html', { name: "Jim" });
});

//News
app.get('/news', (req, res) => {
    res.render('news.html', { name: "Jim" });
});

//Contact
 var issue = { name: "", email: "", message: "" };
app.get('/contact', (req, res) => {
    res.render('contact.html', { status: "100", Error: "",issue});
});


//SEND INFO PAGE WITH RESPONSE?????
//CONTACT ME POPUP
app.post('/contact', (req, res) => {

    const { error } = validateEmail(req.body);
    if (error) {
      console.log(error.details[0].message)
      res.status(400)
      issue = { name: "", email: "", message: "" };

      if (error.details[0].path[0] == 'name' ){
          issue["name"] = "True";
      }
      else if (error.details[0].message.indexOf("email") > 0) {
            issue["email"] = "True";
      }
      else if (error.details[0].message.indexOf("message") > 0) {
          issue["message"] = "True";
      }

      res.render('contact.html', { status: "400", Error: error.details[0].message, issue});


    return;
  }
  //fmail.Mailer(req.body.name,req.body.email, req.body.message);
    issue = { name: "", email: "", message: "" };
    res.render('contact.html', {status: "99", Error: "",issue });
  });


//////////////////VALIDATION///////////////////
//EMAIL
function validateEmail(item){
    const schema = {
    name: Joi.string().max(50).min(1).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(1).required(),
  };

  return Joi.validate(item, schema);
}

////////////////////PORT STUFF///////////////////
//env variable set outside application ex PORT
const port = process.env.PORT || 8080;
app.listen(port, ()=> {
  console.log(`listening on port ${port}...`)
});
