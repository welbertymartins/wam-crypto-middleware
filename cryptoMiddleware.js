const crypto = require("crypto")

const crypt = (algorithm = "aes-256-ctr") => (privateKey) => (content) => {
    const cipher = crypto.createCipher(algorithm, privateKey)
    return cipher.update(content, 'utf8', 'hex')
}

const decrypt = (algorithm = "aes-256-ctr") => (privateKey) => (content) => {
    const decipher = crypto.createDecipher(algorithm, privateKey)
    return decipher.update(content, 'hex', 'utf8')
}

const hash = (algorithm = "sha512") => (content) => crypto.createHash(algorithm).update(content).digest('hex')

const base64Encode = (content) => {
    const bufferObj = Buffer.from(content, "utf8")
    return bufferObj.toString("base64");
}

const base64Decode = (content) => {
    const bufferObj = Buffer.from(content, "base64");
    return bufferObj.toString("utf8");
}

module.exports = { crypt, decrypt, hash, base64Encode, base64Decode }