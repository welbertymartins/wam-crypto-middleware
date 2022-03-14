const crypto = require("crypto")

const crypt = (algorithm = "aes-256-ctr", delimiter = ":", ivLength = 16) => (prePrivateKey) => (content, notLog = false) => {
    try {
        const privateKey = hash('sha256')(prePrivateKey)
        const iv = crypto.randomBytes(ivLength);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(privateKey, 'hex'), iv)
        const encrypted = Buffer.concat([cipher.update(String(content)), cipher.final()])
        return `${iv.toString('hex')}${delimiter}${encrypted.toString('hex')}`
    } catch (error) {
        if (!notLog) {
            console.log(error)
        }
        return ``
    }
}

const decrypt = (algorithm = "aes-256-ctr", delimiter = ":") => (prePrivateKey) => (content, notLog = false) => {
    try {
        const privateKey = hash('sha256')(prePrivateKey)
        const contentParts = String(content).split(delimiter)
        const iv = Buffer.from(contentParts.shift(), 'hex')
        const contentEncrypted = Buffer.from(contentParts.join(delimiter), 'hex')
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(privateKey, 'hex'), iv)
        const decrypted = Buffer.concat([decipher.update(contentEncrypted), decipher.final()])
        return decrypted.toString();
    } catch (error) {
        if (!notLog) {
            console.log(error)
        }
        return ""
    }
}

const hash = (algorithm = "sha512") => (content, notLog = false) => {
    try {
        return crypto.createHash(algorithm).update(String(content)).digest("hex")
    } catch (error) {
        if (!notLog) {
            console.log(error)
        }
        return ""
    }
}

const base64Encode = (content, notLog = false) => {
    try {
        const bufferObj = Buffer.from(content, "utf8")
        return bufferObj.toString("base64")
    } catch (error) {
        if (!notLog) {
            console.log(error)
        }
        return ""
    }
}

const base64Decode = (content, notLog = false) => {
    try {
        const bufferObj = Buffer.from(content, "base64")
        return bufferObj.toString("utf8")
    } catch (error) {
        if (!notLog) {
            console.log(error)
        }
        return ""
    }
}

module.exports = { crypt, decrypt, hash, base64Encode, base64Decode }
