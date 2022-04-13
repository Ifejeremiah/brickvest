// Model recovery email message
const mail = (token) => {
  const message = {
    sub: `Brickvest - Verify Account`,
    body: `Hello there!<br/>Here is your verification code: <h1>${token}</h1><br/> Have a great day.`
  }

  return message;
}



module.exports = mail;
