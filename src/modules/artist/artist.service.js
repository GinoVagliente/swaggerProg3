const artistModel = require('../../models/artist')
const pager = require("../../utils/pager");


async function createIfNotExists(decoded, response) {
    let user = await findOne(decoded.email)
    if(!user){
        user = {firtname:decoded.given_name, lastname: decoded.family_name ,email:decoded.email}
        await save(user)
    }
    return user   

}
async function findOneById(_id){
  return await artistModel.findById(_id).exec()
}
async function findOne(email){
    return await artistModel.findOne({email:email}).exec()
}

async function save(user){
    let _user = new artistModel(user)  
    return await _user.save()
}

module.exports = { createIfNotExists,findOneById, findOne, save};