const Restroom = require("../models/Restroom.model")

const getScore = restroomID => {
    return Restroom
        .findById(restroomID)
        .populate("votes")
        .select({ votes: 1 })
        .then(({ votes }) => {
            console.log(votes)

            const votesCount = votes.reduce((acc, elm) => {
                const { vote } = elm
                vote === 'up' ? acc++ : acc--

                return acc
            }, 0)
            console.log(votesCount)
            return (votesCount ? (votesCount / votes.length) * 100 : 0)
        })
        .catch(err => next(err))
}

module.exports = { getScore }
