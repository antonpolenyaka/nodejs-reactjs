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

    // Check for null
    if(uid == null) {
        return false;
    }

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

    // Check checksum
    const id = uid.substring(2, 26);
    const currentChecksum = uid.substring(26, 28);
    const goodChecksum = generateChecksumById(id);
    if(currentChecksum !== goodChecksum) {
        return false;
    }

    // Is all ok
    return true;
}

function makeUid(objectId, entityType) {
    const id = objectId.toString();
    const checksum = generateChecksumById(id);
    const uid = entityType + id + checksum;
    return uid;
}

function generateChecksumById(id) {
    if(id == null || id.length != 24) {
        return null;
    }
    
    // All possible letters for checksum
    const lettersLeft = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lettersRight= "ANTONPOLENYAKANIKOLAYEVICH";
    const multiplicator = 180884;
    const totalLetters = lettersLeft.length;
    
    // Calculate weight of letters
    let total = 0;
    for(let i = 0; i < id.length; i++) {
        let num = id.charCodeAt(i);
        total += num * multiplicator;      
    }
    
    // Calculate left letter
    let left = total.toString();
    let leftNum;
    do {
        leftNum = 0;
        for(let i = 0; i < left.length; i++) {
            leftNum += parseInt(left[i]);
        }
        left = leftNum.toString();
    } while(leftNum >= totalLetters);
    
    // Calculate right letter
    const rightNum = totalLetters - leftNum;
    
    // Result is two letters Left calculated and right calculated
    const checksum = lettersLeft[leftNum] + lettersRight[rightNum];
    return checksum;
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

module.exports = { checkValidUID, makeUid, checkCorrectEntityType };