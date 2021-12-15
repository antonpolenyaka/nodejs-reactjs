"use strict";

let express = require('express');
let uuid = require('../../utils-uid');
let router = express.Router();
let uidModel = require('../../models/uid-model');
let ucomm = require('../../utils-communications');

router.post('/', function(req, res, next) {
    const replaceError = "Error: login failed";

    console.log("login", req.body);
    let uid = req.body.uid || null;
    let password = req.body.password || null;
    // First check valid info
    if(!uuid.checkValidUID(uid) || password == null) {
        ucomm.ResponseError(res, replaceError);
        return;
    }
    
    uidModel.Connect()
    .then(({mc, db}) => {
        // Find entity
        uidModel.FindOneByUidPsw(db, uid, password)
        .then(entity => {
            if(entity) {
                res.json({ok: true, uid: uid, result: entity});
            } else {
                ucomm.ResponseError(res, replaceError);
            }
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
});

module.exports = router;