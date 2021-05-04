var nodemailer = require('nodemailer');


var sendMail = (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'slogodki@gmail.com',
            pass: 'slogodki123'
        }
    });

    var mailOptions = {
        from: 'slogodki@gmail.com',
        to: 'klemen1krsnik@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    console.log(req)
    console.log(res)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.render('', {title: 'neki'});

}

module.exports = {
    sendMail,
}