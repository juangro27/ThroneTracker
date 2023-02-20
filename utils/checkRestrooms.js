const Restroom = require("../models/Restroom.model")

const checkRestrooms = restrooms => {

    const RestroomsFindPromises = restrooms.map(restroom => {
        return Restroom
            .findOne({ reference: restroom.reference })
    })
    return Promise.all(RestroomsFindPromises)
        .then(restroomsChecked => {
            const restroomPromises = restroomsChecked.map((restroomResult, i) => {
                if (restroomResult) {
                    return Restroom
                        .findByIdAndUpdate(restroomResult._id, restrooms[i])
                } else {
                    return Restroom
                        .create(restrooms[i])
                }
            })
            return Promise.all(restroomPromises)
        })
        .then(restrooms => restrooms)
        .catch(err => netx(err))
}
module.exports = checkRestrooms