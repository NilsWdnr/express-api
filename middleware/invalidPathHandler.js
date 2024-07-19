const invalidPathHandler = (request, response, next) => {
    response.status(404)
    response.send('The path you requestet could not be found.')
}

module.exports = invalidPathHandler;