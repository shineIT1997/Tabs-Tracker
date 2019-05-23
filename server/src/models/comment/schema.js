

const schema = {

}


const options ={
    collection: 'comments',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

module.exports = {
    schema ,
    options
}