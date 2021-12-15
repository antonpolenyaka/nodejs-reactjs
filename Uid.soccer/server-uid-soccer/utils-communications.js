"use strict";

function ResponseError(res, errorMessage) {
    res.json({ok: false, message: errorMessage});
}

module.exports = { ResponseError };