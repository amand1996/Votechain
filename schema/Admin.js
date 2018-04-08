const schema = {
    login_id: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
}

export const getSchema = () => {
    return schema;
}

export const adminSchema = (app, mongoose) => {
    const _schema = schema;

    var AdminSchema = new mongoose.Schema(_schema);

    AdminSchema.index({
        _id: 1
    });
    AdminSchema.set('autoIndex', (app.get('env') === 'development'));

    app.db.model('Admin', AdminSchema);
};