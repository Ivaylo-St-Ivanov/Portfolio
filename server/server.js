/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const mail = {
        from: name,
        to: process.env.EMAIL_USER,
        subject: subject,
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Subject: ${subject}</p>
               <p>Message: ${message}</p>`
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: 'Fail' });
        } else {
            res.json({ status: 'Successful sent' });
        }
    });
});


const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));