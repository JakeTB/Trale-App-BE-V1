const connection = require("../db/connection");
exports.getAllPubs = () => {
  return connection.select("*").from("pubs")
};


exports.getSinglePub = params => {
  const { id } = params
  return connection
    .select("*")
    .from("pubs")
    .where({ id })
    .then(pub => {
      if (pub[0]) return pub;
      else {
        return Promise.reject({
          message: "That id does not exist",
          status: 404
        })
      }
    })
}

exports.patchSinglePub = (params, body) => {
  const { id } = params
  const { pub_name } = body
  return connection
    .select("*")
    .from("pubs")
    .where({ id })
    .update({ pub_name })
    .returning("*")

}

exports.addNewPub = pub => {
  const newPub = {
    pub_name: pub.pub_name,
    pub_description: pub.pub_description,
    pub_address: pub.pub_address,
    pub_picture: pub.pub_picture,
    lat: pub.lat,
    lng: pub.lng
  }

  return connection
    .insert(newPub)
    .into("pubs")
    .returning("*")
    .then(pub => {
      return pub[0]
    })
}