// Model recovery email message
const mail = (token) => {
  const message = {
    sub: `Brickvest - Recover Account`,
    body: `Hello!<br/>Here is your recovery token: <h1>${token}</h1> You can only use it once, then you can <bold>reset your password on login<bold>.`
  }

  return message;
}



module.exports = mail;
