var Twit = require('twit')
var express = require('express')
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var app = express()

var analyzer = new ToneAnalyzerV3({
  username: '1d983e8a-1114-4d70-8e1d-e22342862aad',
  password: 'jBYGMQ0vHFTA',
  version_date: '2017-09-21'
});

var T = new Twit({
    consumer_key: '899sWOGu9LqBsnVksIlmgvOeE',
    consumer_secret: 'qeLK9cjSHP3tc3JJ1V48NJUEP5QJyTEiNdGmGuFdnyW7qHm8Cl',
    access_token: '700723572751269888-8lrBXE2xlyjoyMKupr8sFZ6JUExoxqC',
    access_token_secret: 'OpGGe5VGTYdvUPROaJ2eQuQQBSTldD5dg4besNHUYkss6',
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
})

app.use(function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}).use(express.json())


app.post('/', (request, response, next) => {
    console.log(`${request.method} ${request.path} ${Date()}`)

    response.tones = []

    var result = T.get('search/tweets', {
        q: request.body.hashtag,
        count: 100,
        result_type: 'popular'
    }, (err, data, answer) => {
        var tweets = data.statuses.map(o => {
            return {
                image: o.user.profile_image_url,
                content: o.text,
            }
        })
        if (tweets.length) {
            analyzer.tone({ text: tweets.map(o => o.content).join('. ') }, (error, tone) => {
                if (Boolean(error)) {
                    console.error(error)
                    response.send({error})
                } else {
                    response.send({
                        tones: tone.document_tone.tones.map(o => {
                            var color;
                            switch (o.tone_id) {
                                case 'joy':
                                    color = 'orange'
                                    break;
                                case 'sadness':
                                    color = 'brown'
                                    break;
                                case 'analytical':
                                    color = 'blue'
                                    break;
                                case 'tentative':
                                    color = 'red'
                                    break;
                                case 'confident':
                                    color = 'green'
                                    break;
                                case 'anger':
                                    color = 'black'
                                    break;
                                case 'fear':
                                    color = 'purple'
                                    break;
                                default:
                                    color = 'grey'
                                    break;
                            }
                            return {
                                score: o.score,
                                color: color,
                                tone_name: o.tone_name
                            }
                        }),
                        tweets: tweets,
                    });
                }
            });
        } else {
            response.send({
                tones: [],
                tweets: []
            })
        }
    });
})

app.listen(4200, () => console.log('Server started on http://localhost:4200/'))