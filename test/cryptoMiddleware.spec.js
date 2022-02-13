const expect = require("chai").expect
const cryptoMiddleware = require("../cryptoMiddleware")

describe("Crypto Middleware", function() {

    it("Encode and Decode Text", function () {
        const text = "Hello World"
        const base64Encode = cryptoMiddleware.base64Encode
        const base64Decode = cryptoMiddleware.base64Decode
        expect( base64Decode(base64Encode(text)) ).to.equal(text)
    })

    it("Crypt and Decrypt Text", function () {
        const text = "Hello World"
        const password = 'password'
        const crypt = cryptoMiddleware.crypt()(password)
        const decrypt = cryptoMiddleware.decrypt()(password)
        expect( decrypt(crypt(text)) ).to.equal(text)
    })

    it("Hash Text", function () {
        const text = "Hello World"
        const textHash = "2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b"
        const hash = cryptoMiddleware.hash()
        expect( hash(text) ).to.equal(textHash)
    })
})
