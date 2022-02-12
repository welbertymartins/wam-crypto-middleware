const crypto = require("crypto")

const crypt = (algorithm = "aes-256-ctr", ivLength = 16, separator = '#') => (privateKey) => (content) => {
    const iv = crypto.randomBytes(ivLength)
    const key = crypto.scryptSync(privateKey, 'salt', 32)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
    const encrypted = Buffer.concat([cipher.update(content), cipher.final()])
    return `${iv.toString('hex')}${separator}${encrypted.toString('hex')}`
}

const decrypt = (algorithm = "aes-256-ctr", separator = '#') => (privateKey) => (content) => {
    const contentParts = content.split(separator)
    const iv = Buffer.from(contentParts.shift(), 'hex')
    const key = crypto.scryptSync(privateKey, 'salt', 32)
    const encrypted = Buffer.from(contentParts.join(separator), 'hex')
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
    return decrypted.toString()
}

const hash = (algorithm = "sha512") => (content) => crypto.createHash(algorithm).update(content).digest("hex")

const base64Encode = (content) => {
    const bufferObj = Buffer.from(content, "utf8")
    return bufferObj.toString("base64")
}

const base64Decode = (content) => {
    const bufferObj = Buffer.from(content, "base64")
    return bufferObj.toString("utf8")
}

module.exports = { crypt, decrypt, hash, base64Encode, base64Decode }