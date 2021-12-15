"use strict";

let express = require('express');
let uuid = require('../../utils-uid');
let router = express.Router();
let uidModel = require('../../models/uid-model');
let ucomm = require('../../utils-communications');

router.get('/:uid', function(req, res, next) {
    const replaceError = "Error: we don't have this entity in Database";
    try {
        let uid = req.params.uid || '';
        if(!uuid.checkValidUID(uid)) {
            ucomm.ResponseError(res, replaceError);
            return;
        }

        uidModel.Connect()
        .then(({mc, db}) => { // mc - MongoClient, db - Db
            // Find entity
            uidModel.FindOneByUid(db, uid)
            .then(entity => {
                res.json({ok: true, uid: uid, result: entity});
            })
            .catch(err => {
                ucomm.ResponseError(res, replaceError);
            })
            .finally(() => {
                uidModel.Close(mc);
            });
        })
        .catch(err => {
            ucomm.ResponseError(res, replaceError);
        });
    } catch (err) {
        ucomm.ResponseError(res, replaceError);
    }
});

router.post('/', function(req, res, next) {
    const replaceError = "Error: now is not possible to save this item in Database";
    uidModel.Connect()
    .then(({mc, db}) => { // mc - MongoClient, db - Db
        // Check entity type
        if(!uuid.checkCorrectEntityType(req.body.entityType)) {
            ucomm.ResponseError(res, replaceError);
            return;
        }

        // Make query
        let query = uidModel.ReqBodyToQuery(req);
        uidModel.InsertOne(db, query)
        .then(cr => { // cr = commandResult
            if(!cr.result.ok || cr.result.n != 1) {
                ucomm.ResponseError(res, replaceError);
                return;
            }
            // Make UID and save it to entity
            let entity = cr.ops[0];
            let newUid = uuid.makeUid(cr.insertedId, entity.entityType);
    
            return uidModel.FindOneAndUpdate(
                db, 
                cr.insertedId,
                {$set: {uid: newUid, updateTimestamp: Date.now()}}
            );
        })
        .then(result => {
            if(result.ok != 1) {
                ucomm.ResponseError(res, replaceError);
                return;
            }
            return uidModel.FindOneById(db, result.value._id);
        })
        .then(entitySaved => {
            res.json({ ok: true, uid: entitySaved.uid, result: entitySaved, 
                comment: 'Use format ISO 8601 for dates. Example: 2014-03-12T13:37:27+00:00'}); 
        })
        .catch((err) => {
            ucomm.ResponseError(res, replaceError);
        })
        .finally(() => {
            uidModel.Close(mc);
        });
    })
    .catch((err) => {
        ucomm.ResponseError(res, replaceError);
    });
});

router.put('/', function(req, res, next) {
    res.json({ok: true, uid: 'ID', message: 'updated'});
});

router.delete('/:uid', function(req, res, next) {
    const replaceError = "Error: now is not possible to remove this item from Database";
    try {
        let uid = req.params.uid || '';
        if(!uuid.checkValidUID(uid)) {
            ucomm.ResponseError(res, replaceError);
            return;
        }

        uidModel.Connect()
        .then(({mc, db}) => { // mc - MongoClient, db - Db
            uidModel.DeleteByUid(db, uid)
            .then(result => {
                if(result.ok != 1) {
                    ucomm.ResponseError(res, replaceError);
                    return;
                }
                
                res.json({ ok: true, uid: uid, result: 'deleted' }); 
            })
            .catch((err) => {
                ucomm.ResponseError(res, replaceError);
            })
            .finally(() => {
                uidModel.Close(mc);
            });
        })
        .catch((err) => {
            ucomm.ResponseError(res, replaceError);
        });
    } catch (err) {
        ucomm.ResponseError(res, replaceError);
    }
});

module.exports = router;