const crypto = require("crypto")

const crypt = (algorithm = "aes-256-ctr") => (privateKey) => (content) => {
    try {
        const cipher = crypto.createCipher(algorithm, privateKey)
        return cipher.update(content, "utf8", "hex")
    } catch (error) {
        console.log(error)
        return ``
    }
}

const decrypt = (algorithm = "aes-256-ctr") => (privateKey) => (content) => {
    try {
        const decipher = crypto.createDecipher(algorithm, privateKey)
        return decipher.update(content, "hex", "utf8")
    } catch (error) {
        console.log(error)
        return ``
    }
}

const hash = (algorithm = "sha512") => (content) => {
    try {
        return crypto.createHash(algorithm).update(content).digest("hex")
    } catch (error) {
        console.log(error)
        return ``
    }
}

const base64Encode = (content) => {
    try {
        const bufferObj = Buffer.from(content, "utf8")
        return bufferObj.toString("base64")
    } catch (error) {
        console.log(error)
        return ``
    }
}

const base64Decode = (content) => {
    try {
        const bufferObj = Buffer.from(content, "base64")
        return bufferObj.toString("utf8")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { crypt, decrypt, hash, base64Encode, base64Decode }
