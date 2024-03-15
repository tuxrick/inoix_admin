let environment = 'production';

let url = {
    development: 'http://localhost:3000/api/v1',
    production: 'https://ionixapi.pinguspace.com/api/v1'
}
module.exports = url[environment];