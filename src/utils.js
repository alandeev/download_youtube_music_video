const request = require('request');

module.exports = {
    str(date, start, end){
        return date.split(start)[1].split(end)[0];
    },
    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    },	
    curl(config){
    	return new Promise(resolve => request(config, (error, res, body) => resolve(body)));
    },
    saveFile(nameFile, body){
        fs.writeFile(nameFile, body, (res) => {
            console.log({save: true});
        })
    },
    orglink(link){
        return link.split('amp;').join('').split('&#61;').join('=');
    },
    appendFile(nameFile, body){
        fs.appendFile(nameFile, body, (res) => {})
    },
    genJWT(config){
        return jwt.sign(config, secret_key, {
            expiresIn: 20000
        });
    }
}