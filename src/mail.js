import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akkusmurat123@gmail.com',
        pass: 'senveben763534'
    }
});

var mailOptions = {
    from: 'akkusmurat123@gmail.com',
    to: 'akkusmurat123@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});