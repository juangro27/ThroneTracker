const Restroom = require("../models/Restroom.model")

const getScore = restroomID => {
    return Restroom
        .findById(restroomID)
        .populate("votes")
        .select({ votes: 1 })
        .then(({ votes }) => {
            const votesCount = votes.reduce((acc, elm) => {
                const { vote } = elm
                if (vote === 'up') acc++
                return acc
            }, 0)
            console.log(votes.length, votesCount)
            return (votesCount ? ((votesCount / votes.length) * 100).toFixed(0) : 0)
        })
        .catch(err => next(err))
}

module.exports = { getScore }
