const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const html = await rp('https://www.transfermarkt.com.tr/super-lig/marktwerte/wettbewerb/TR1');
        const $ = cheerio.load(html);
        
        const players = [];
        
        $('.items .odd, .items .even').slice(0, 10).each((index, element) => {
            const name = $(element).find('.hauptlink a').text().trim();
            const club = $(element).find('img.tiny_wappen').attr('alt');
            const value = $(element).find('.rechts.hauptlink').text().trim();
            
            players.push({ name, club, value });
        });
        
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).send('Bir hata oluştu');
    }
});

app.listen(port, () => {
    console.log(`Server http://localhost:${port} adresinde çalışıyor`);
});