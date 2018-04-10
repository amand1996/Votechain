const schema = {
    name: String,
    constituency: String
}

export const getSchema = () => {
    return schema;
}

export const candidateSchema = (app, mongoose) => {
    const _schema = schema;

    var CandidateSchema = new mongoose.Schema(_schema);

    CandidateSchema.index({
        _id: 1
    });
    CandidateSchema.set('autoIndex', (app.get('env') === 'development'));

    app.db.model('Candidate', CandidateSchema);
};