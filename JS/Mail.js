var nodemailer = require('nodemailer');
const pass = 'BboyNoReply210'
var ex = function mailinfo(from, email, message){
    this.from = from
    this.message = message

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'BrandonRNoReply@gmail.com',
        pass: pass
      }
    });

    var mailOptions = {
      from: 'BrandonRNoReply@gmail.com',
      to: 'scott.butry@gmail.com',
      subject: from + " "+email ,
      text: message
    };
    console.log(message)
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  };

module.exports.Mailer = ex;
