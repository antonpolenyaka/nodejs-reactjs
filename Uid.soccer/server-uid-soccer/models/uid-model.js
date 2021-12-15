let config = require('../config.json')
let MongoClient = require('mongodb').MongoClient;

function InsertOne(db, query) {
    return db.collection(config.db.tableForEntity).insertOne(query);
}

function FindOneByUid(db, uid) {
    return db.collection(config.db.tableForEntity).findOne({uid: uid});
}

function FindOneByUidPsw(db, uid, password) {
    // Return all, without password field
    return db.collection(config.db.tableForEntity)
        .findOne({uid: uid, password: password}, {projection: {password: 0, updateTimestamp: 0, _id: 0, uid: 0}});
}

function FindOneById(db, id) {
    return db.collection(config.db.tableForEntity).findOne({_id: id}, {projection: {password: 0, updateTimestamp: 0, _id: 0}});
}

function FindOneAndUpdate(db, id, query) {
    return db.collection(config.db.tableForEntity).findOneAndUpdate({_id: id}, query);
}

function DeleteByUid(db, uid) {
    return db.collection(config.db.tableForEntity).findOneAndUpdate({uid: uid}, {$set: {isDeleted: true, updateTimestamp: Date.now()}});
}

function Connect(){
    return MongoClient.connect(config.db.connectionString)
            .then(mc => { // mongoClient
                let db = mc.db(config.db.database);
                return {mc, db};
            });            
}

function ReqBodyToQuery(req) {
    let query = { 
        entityType: req.body.entityType, // checked previosly
        language: req.body.language || 'en',
        fullName: req.body.fullName || null, 
        country: req.body.country || 'US',
        phone: req.body.phone || null,
        email: req.body.email || null,
        birthday: Date.parse(req.body.birthday) || null, // Format ISO 8601 dates. Example: 2014-03-12T13:37:27+00:00
        password: req.body.password || null,
        photo: req.body.photo || null,
        accessUrls: req.body.accessUrls || [],
        isDeleted: false,
        updateTimestamp: Date.now()
    };
    return query;
}

function Close(mc) {
    mc.close();
}

module.exports = { 
    InsertOne, 
    DeleteByUid, 
    FindOneById, 
    FindOneByUid, 
    Connect, 
    Close, 
    ReqBodyToQuery, 
    FindOneAndUpdate,
    FindOneByUidPsw }