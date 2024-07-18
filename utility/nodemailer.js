const nodemailer = require("nodemailer");

module.exports.sendMail=async function sendMail(str,data){
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "adityalp2510@gmail.com",
    pass: "vcra nqyv lccx tolp",
  },
});

var Osubject,Otext,Ohtml;
if(str=="signup"){
    Osubject=`Thankyou for signing  ${data.name}`;
    Ohtml=`<h1>welcome to Foodypie.com</h1>
    Hope you have a good time 
    here are your details-
    Name=${data.name}
    Email-${data.email}`
}
else if(str=="resetpassword"){
    Osubject=`Reset Password`;
    Ohtml=`<h1>foodypie.com</h1>
    here is your link to reset your password!
    ${data.resetPasswordLink}`
}


  const info = await transporter.sendMail({
    from: '"Foodypie " <adityalp2510@gmail.com>',
    to: data.email, 
    subject: Osubject, 
    html:Ohtml, 
  });

  console.log("Message sent: %s", info.messageId);
}

