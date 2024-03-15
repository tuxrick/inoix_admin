let environment = 'development';

let url = {
    development: 'http://localhost:3000/api/v1',
    production: 'https://TBD.com/api/v1'
}
module.exports = url[environment];