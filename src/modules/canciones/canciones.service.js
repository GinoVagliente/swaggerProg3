const cancionesModel = require('../../models/canciones')
const pager = require("../../utils/pager");

async function findOneById(_id) {
  return await cancionesModel.findById(_id).populate('artist').exec()
}
async function findOne(email) {
  return await cancionesModel.findOne({ email: email }).exec()
}

async function findAll() {
  return await cancionesModel.find({}).populate('artist');
}

async function update(id, updatedCancion) {
  return await cancionesModel.findByIdAndUpdate(id, updatedCancion, { new: true }).exec();
}

async function save(user) {
  let _user = new cancionesModel(user)
  return await _user.save()
}

async function remove(id) {
  return await cancionesModel.findOneAndDelete({ _id: id }).exec();
}

async function paginated(params) {
  let perPage = params.perPage ? params.perPage : 10, page = Math.max(0, params.page)
  let filter = params.filter ? params.filter : {}
  let sort = params.sort ? params.sort : {}

  let count = await cancionesModel.countDocuments(filter)
  let data = await cancionesModel.find(filter)
    .populate('artist')
    .limit(perPage)
    .skip(perPage * page)
    .sort(sort)

    .exec();

  return pager.createPager(page, data, count, perPage)
}

module.exports = { findOneById, findOne, save, findAll, remove, update, paginated };