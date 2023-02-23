const parseRestrooms = restroomsArray => {

    return restroomsArray.map(restroom => {

        const {
            id: reference,
            name,
            comment: description,
            street,
            city,
            state,
            country,
            directions: indications,
            changing_table,
            accessible,
            unisex,
            latitude,
            longitude,
        } = restroom



        const restroomObject = {
            reference,
            name,
            description,
            address: {
                street,
                city,
                state,
                country,
                indications,
            },
            features: {
                changing_table,
                accessible,
                unisex,
            },
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        }

        return restroomObject
    })
}

module.exports = { parseRestrooms }
