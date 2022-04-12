// Return all properties
const allProperties = (req, res) => {
  return res.status(200).json({ msg: 'Your properties are 5' });
}



module.exports = {
  allProperties
}