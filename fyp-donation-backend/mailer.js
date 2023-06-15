const nodemailer = require("nodemailer");

const sendMail=(email,subject,message)=>{
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "27e4d283548ce6",
          pass: "b027a74b7a6117"
        }
      });

    
    transport.sendMail({
        from: '"Donation management system" <admin@example.com>', 
        to: email,
        subject: subject,
        text:message, 
      });
}



module.exports={sendMail};