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
    gerarCpf(comPontos=false){
        var numbers = []
        for(var i=0; i<11; i++){
            numbers.push(Math.round(Math.random() * 9));
        }

        var [ n1, n2, n3, n4, n5, n6, n7, n8, n9 ] = numbers;

        var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
        d1 = 11 - (Math.round(d1 - (Math.floor(d1 / 11) * 11)));
        if (d1 >= 10) d1 = 0;
        var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
        d2 = 11 - (Math.round(d2 - (Math.floor(d2 / 11) * 11)));;
        if (d2 >= 10) d2 = 0;
        if (comPontos)return '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
        else return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
    },
    genJWT(config){
        return jwt.sign(config, secret_key, {
            expiresIn: 20000
        });
    }
}