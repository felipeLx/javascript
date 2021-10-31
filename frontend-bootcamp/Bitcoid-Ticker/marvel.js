const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const http = require("http");
const crypto = require("crypto");

const key = require("./keys");
let API_KEY = key.API_KEY;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//default not avail image
let IMAGE_NOT_AVAIL = "https://image.shutterstock.com/image-vector/house-not-available-icon-flat-260nw-1030785001.jpg";

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

var cache = [];

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

app.post("/", (req, res) => {
    console.log('post request');
    function getCover(cb) {
        //first select a random year
        var year = getRandomInt(1960, 2013);
        //then a month
        var month = getRandomInt(1,12);
    
        var cache_key = year + "_" + month;
        
        if(cache_key in cache) {
            console.log('had cache for '+cache_key);
            var images = cache[cache_key].images;
            cache[cache_key].hits++;
            cb(images[getRandomInt(0, images.length-1)]);		
        } else {
            var monthStr = month<10?"0"+month:month;
            //lame logic for end of month
            var eom = month==2?28:30;
            var beginDateStr = year + "-" + monthStr + "-01";
            var endDateStr = year + "-" + monthStr + "-" + eom;
            var url = "http://gateway.marvel.com/v1/public/comics?limit=100&format=comic&formatType=comic&dateRange="+beginDateStr+"%2C"+endDateStr+"&apikey="+API_KEY;
            var ts = new Date().getTime();
            var hash = crypto.createHash('md5').update(ts + PRIV_KEY + API_KEY).digest('hex');
            url += "&ts="+ts+"&hash="+hash;
            //TEMP
            //var url ="http://127.0.0.1/testingzone/html5tests/marvel/resp.json";
            
            console.log(new Date()+' '+url);
            
            http.get(url, function(res) {
                var body = "";
    
                res.on('data', function (chunk) {
                    body += chunk;
                });
                
                res.on('end', function() {
                    //result.success = true;
    
                    var result = JSON.parse(body);
                    var images;
                    
                    if(result.code === 200) {
                        images = [];
                        console.log('num of comics '+result.data.results.length);
                        for(var i=0;i<result.data.results.length;i++) {
                            var comic = result.data.results[i];
                            //console.dir(comic);
                            if(comic.thumbnail && comic.thumbnail.path != IMAGE_NOT_AVAIL) {
                                var image = {};
                                image.title = comic.title;
                                for(var x=0; x<comic.dates.length;x++) {
                                    if(comic.dates[x].type === 'onsaleDate') {
                                        image.date = new Date(comic.dates[x].date);
                                    }
                                }
                                image.url = comic.thumbnail.path + "." + comic.thumbnail.extension;
                                images.push(image);
                            }
                        }
                        //console.dir(images);
                        //now cache it
                        cache[cache_key] = {hits:1};
                        cache[cache_key].images = images;
                        cb(images[getRandomInt(0, images.length-1)]);
                    } else if(result.code === "RequestThrottled") {
                        console.log("RequestThrottled Error");
                        /*
                        So don't just fail. If we have a good cache, just grab from there
                        */
                        if(Object.size(cache) > 5) {
                            var keys = [];
                            for(var k in cache) keys.push(k);
                            var randomCacheKey = keys[getRandomInt(0,keys.length-1)];
                            images = cache[randomCacheKey].images;
                            cache[randomCacheKey].hits++;
                            cb(images[getRandomInt(0, images.length-1)]);		
                        } else {
                            cb({error:result.code});
                        }
                    } else {
                        console.log(new Date() + ' Error: '+JSON.stringify(result));
                        cb({error:result.code});
                    }
                    //console.log(data);
                });
            
            });
        }
    }
});

app.listen(3000, () => {
    console.log("listen on port 3000");
});

