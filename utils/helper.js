const { nanoid } = require("nanoid");


function generateShortUrl() {
    return nanoid(8);
}

module.exports = {
    generateShortUrl
}