const express = require('express');
const app = express();
const port = 80;
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.post('/contact', function (req, res) {
  console.log('contact hit');
  console.log('req.body', req.body)
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.GMAIL_USER,
    subject: 'New message from contact form at illuminateio.org',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contact-failure');
    }
    else {
      res.render('contact-success');
    }
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!\nHello, World!`));
