const nanoid = require("nanoid");


const generateShortUrl = () => {
    return nanoid(8);
}

module.exports = {
    generateShortUrl
}