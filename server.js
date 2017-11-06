var Twit = require('twit')
var express = require('express')

var app = express()

app.get('/', (request, response) => {
    console.log(`${request.method} ${request.path} ${Date()}`)
    
    var T = new Twit({
        consumer_key: '899sWOGu9LqBsnVksIlmgvOeE',
        consumer_secret: 'qeLK9cjSHP3tc3JJ1V48NJUEP5QJyTEiNdGmGuFdnyW7qHm8Cl',
        access_token: '700723572751269888-8lrBXE2xlyjoyMKupr8sFZ6JUExoxqC',
        access_token_secret: 'OpGGe5VGTYdvUPROaJ2eQuQQBSTldD5dg4besNHUYkss6',
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    })

    var result = T.get('search/tweets', {
        q: 'bitcoin',
        count: 100,
        result_type: 'popular'
    }, (err, data, answer) => {
        response.send({
            tweets: data.statuses.map(o => o.text)
        });
    });
})

app.listen(4200, () => console.log('Server started on http://localhost:4200/'))