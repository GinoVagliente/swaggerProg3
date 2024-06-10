const cancionesModel = require('../../models/canciones')

async function findOneById(_id) {
  return await cancionesModel.findById(_id).populate('artist').exec()
}
async function findOne(email) {
  return await cancionesModel.findOne({ email: email }).exec()
}

async function findAll() {
  return await cancionesModel.find({}).populate('artist');
}

async function save(user) {
  let _user = new cancionesModel(user)
  return await _user.save()
}

async function remove(id) {
  return await cancionesModel.findOneAndDelete({ _id: id }).exec();
}

module.exports = {findOneById, findOne, save, findAll, remove};