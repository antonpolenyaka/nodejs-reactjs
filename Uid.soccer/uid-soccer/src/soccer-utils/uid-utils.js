function checkValidUID(uid) {
    // UID = 28 characters: 2 letter for entity type, 24 Mongo object id, 2 letter for checksum
    // Mongo object id 24 hex. The 12 bytes of an ObjectId are constructed using:
    // - a 4 byte value representing the seconds since the Unix epoch
    // - a 3 byte machine identifier
    // - a 2 byte process id
    // - a 3 byte counter (starting with a random value)
    const goodLen = 28;

    // First identification letters of UID
    // - pl - player
    // - co - coach
    // - sf - soccer field
    // - fc - soccer club (football club)
    const goodFirstLetters = ['pl','co','sf','fc'];

    // Check type
    if(typeof uid == 'undefined') {
        return false;
    }

    // Check len
    if(uid.length !== goodLen) {
        return false;
    }
    
    // Check first letters
    let isCorrectFirstLetters = false;
    for (let index in goodFirstLetters) {
        if(uid.startsWith(goodFirstLetters[index])) {
            isCorrectFirstLetters = true;
            break;
        }
    }
    if(!isCorrectFirstLetters) {
        return false;
    }

    // Is all ok
    return true;
}

function checkCorrectEntityType(entityType) {
    let isCorrect;
    switch(entityType) {
        case 'pl':
        case 'co':
        case 'sf':
        case 'fc':
            isCorrect = true;
            break;
        default:
            isCorrect = false;
            break;
    }
    return isCorrect;
}

module.exports = { checkValidUID, checkCorrectEntityType };