class ApplicationError extends Error {
  constructor (msg, fileName, lineNumber, originalError) {
    super(msg)
    this.fileName = fileName
    this.lineNumber = lineNumber
    this.orginalError = originalError
    this.name = this.constructor.name
  }
}

module.exports = ApplicationError
