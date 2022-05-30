const fs = require('fs')
const path = require('path')

const { db, paginate, build } = require('../config')

module.exports = {
  getAll, getById,
  create, updateById,
  deleteById
}

async function getAll(page, limit) {
  const property = await paginate(
    db.Property, true,
    {}, page, limit
  )
  return build(property, format)
}

async function getById(id) {
  const property = await getProperty(id)
  return { ...format(property) }
}

async function create(body) {
  const property = await db.Property.create(body)
  return format(property)
}

async function updateById(id, body) {
  const property = await getProperty(id)
  Object.assign(property, body)
  await property.save()
  return format(property)
}

async function deleteById(id) {
  const property = await getProperty(id)
  removeFile(property.image)
  await db.Property.findByIdAndDelete(property.id)
  return { ...format(property) }
}

// helper functions

async function getProperty(id) {
  if (!db.isValidId(id)) throw 'Invalid Property ID'
  const property = await db.Property.findById(id).populate(['createdBy', 'updatedBy'])
  if (!property) throw 'Property not found'
  return property
}

function removeFile(name) {
  const file = path.join(__dirname, `${process.env.UPLOAD_IMG_PATH}/${name}`);
  fs.unlink(file, () => { })
}

function format(result) {
  let { _id, name, image, location,
    yearBuilt, size, description, totalUnits,
    unitsAvailable, costPerUnit, status, ROIEstimate,
    createdBy, updatedBy, createdAt, updatedAt, isPrivate, } = result;
  return {
    id: _id, name, image, location,
    yearBuilt, size, description, totalUnits,
    unitsAvailable, costPerUnit, status, ROIEstimate,
    createdBy, updatedBy, isPrivate, createdAt, updatedAt
  };
}