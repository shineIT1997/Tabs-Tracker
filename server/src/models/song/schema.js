

const schema = {

}


const options ={
    collection: 'songs',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

module.exports = {
    schema ,
    options
}