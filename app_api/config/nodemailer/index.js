const nodemailer = require("nodemailer");

const client = process.env.CLIENT_NAME,
  password = process.env.CLIENT_PASSWORD,
  client_email = process.env.CLIENT_EMAIL_ADDRESS,
  developer_email = process.env.DEV_EMAIL_ADDRESS;


module.exports = () => {

  // Config nodemailer using Google Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: client_email,
      pass: password,
    },
  });


  // Client's recipient
  const clientRecipient = `"${client}": ${client_email}`;


  return {
    // Send emails from client's email 
    send: async (to, subject, body) => {
      const info = await transporter.sendMail({
        from: clientRecipient,
        to: to,
        subject: subject,
        html: body,
        generateTextFromHtml: true
      })
        .catch(err => console.log(err));

      console.log("Message sent: %s", info.messageId ? info.messageId : '');
    },


    // Send server error emails to developer from client's email 
    error: async (message, filename, exception) => {

      const body = `
      <h1>${client} Site Server Error</h1>
         message: ${message}`;


      if (filename) body += `filename: ${filename}`;

      if (exception) body += `exception: ${exception}`;

      const info = await transporter.sendMail({
        from: developer_email,
        to: developerRecipient,
        subject: `<h1>${client} Site Server Error</h1>`,
        html: body,
        generateTextFromHtml: true
      })
        .catch(err => console.log(err));

      console.log("Message sent: %s", info.messageId ? info.messageId : '');
    }
  };
}
