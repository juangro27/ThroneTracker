const Restroom = require("../models/Restroom.model")

const checkRestrooms = restrooms => {
    const RestroomsFindPromises = restrooms.map(({ reference }) => Restroom.findOne({ reference }))

    return Promise
        .all(RestroomsFindPromises)
        .then(restroomsChecked => {

            const restroomPromises = restroomsChecked.map((restroomResult, i) => {

                return restroomResult
                    ? Restroom.findByIdAndUpdate(restroomResult._id, restrooms[i])
                    : Restroom.create(restrooms[i])
            })

            return Promise.all(restroomPromises)
        })
        .then(restrooms => restrooms)
        .catch(err => netx(err))
}

module.exports = { checkRestrooms }