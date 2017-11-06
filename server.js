var Twit = require('twit')
var express = require('express')
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var app = express()

var analyzer = new ToneAnalyzerV3({
  username: '1d983e8a-1114-4d70-8e1d-e22342862aad',
  password: 'jBYGMQ0vHFTA',
  version_date: '2017-09-21'
});


app.get('/', (request, response) => {
    console.log(`${request.method} ${request.path} ${Date()}`)

    response.header('Access-Control-Allow-Origin', '*');

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

        analyzer.tone({ text: data.statuses[0].text }, (err, tone) => {
            response.send({
                text: data.statuses[0].text,
                tones: tone.sentences_tone.reduce((acc, curr) => acc.concat(curr.tones), [])
            });
        });
    });
})

app.listen(4200, () => console.log('Server started on http://localhost:4200/'))