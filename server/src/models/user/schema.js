

const schema = {

}


const options ={
    collection: 'users',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

module.exports = {
    schema ,
    options
}