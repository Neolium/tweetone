var app = new Vue({
    el: '#app',
    data: {
        content: '"I hate you."',
        tones: []
    },
    methods: {
        go: function() {

            function randomString(length) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for(var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return btoa(text);
            }

            var request = {
                oauth_consumer_key: encodeURIComponent('899sWOGu9LqBsnVksIlmgvOeE'), // OK
                oauth_nonce: encodeURIComponent(randomString(16)),
                oauth_signature_method: encodeURIComponent('HMAC-SHA1'),
                oauth_timestamp: Math.round(Date.now() / 1000),
                oauth_token: encodeURIComponent('700723572751269888-8lrBXE2xlyjoyMKupr8sFZ6JUExoxqC'), // OK
                oauth_version: encodeURIComponent('1.0')
            }
            
            var signatureBase = Object.keys(request).map(encodeURIComponent).sort().map(key => key + '=' + request[decodeURIComponent(key)]).join('&')

            signatureBase = `GET&${encodeURIComponent('https://api.twitter.com/1.1/search/tweets.json')}&${encodeURIComponent(signatureBase)}`
            
            signKey = encodeURIComponent('qeLK9cjSHP3tc3JJ1V48NJUEP5QJyTEiNdGmGuFdnyW7qHm8Cl') + '&' + encodeURIComponent('OpGGe5VGTYdvUPROaJ2eQuQQBSTldD5dg4besNHUYkss6')
            signature = encodeURIComponent(btoa(sha1(signatureBase + signKey)))

            console.log(`OAuth oauth_consumer_key="${request.oauth_consumer_key}", oauth_nonce="${request.oauth_nonce}", oauth_signature="${signature}", oauth_signature_method="${request.oauth_signature_method}", oauth_timestamp="${request.oauth_timestamp}", oauth_token="${request.oauth_token}", oauth_version="${request.oauth_version}"`)

            // ?q=%23superbowl&result_type=recent
            // this.$http.get('https://api.twitter.com/1.1/search/tweets.json', {
            //     headers: {
            //         'Access-Control-Allow-Origin': '*',
            //         'Authorization': `OAuth oauth_consumer_key="${request.oauth_consumer_key}", oauth_nonce="${request.oauth_nonce}", oauth_signature="${signature}", oauth_signature_method="${request.oauth_signature_method}", oauth_timestamp="${request.oauth_timestamp}", oauth_token="${request.oauth_token}", oauth_version="${request.oauth_version}"`
            //     }
            // }).then(console.log)


            // Rx.Observable.fromPromise(this.$http.post('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21', {
            //     text: this.content
            // }, {
            //     headers: {
            //         'X-Watson-Authorization-Token': 'xUxXOuPlu5fvjpOqYy2jzJsMpmpB66tzAaqacCHip1v%2FqRa8W0%2BnhcGRVhssR1SWQkHc9d3nJsMmSTMuh7H9RkmzTA8x3hUPXWi25FdhS64qwLs%2BzHyEfvk4k2TdRlZ0q4fO79NYf61Pefd5UbtDlMbUrubSA3FeBT6h8w5Gce81fJRGNodO2Iv4Vms6daq3fWCtxFkK%2BtnXuN17%2FUP%2FH%2BWVlHmknTAJ8FKMtlh1GqDJf0SXmnB4PQhpVnpLAPQGTefm3%2BnixtWhJ5Kc%2BVNW18UcJNPaiM1HB2OdLBwRHkVWQiaKycgdKQ47MtrGr%2FQSMF9QOUtjzXzbnnp3kMF9btj1TlIH4Lz8kPafeQmC4z2c5ySSxuLlZJ9dfONj96L6kNoB3m2lzAV9Kf6An1TucBs2LLpsptsR6BKHuFCL4jOjJ4v%2B8YwUFuZwWuiVq8fOtuUqH68HliIvrP1sBWh3Kqk08VIeAxrsDsWbxtZh6c6udD047%2FYcQjlTNuEHXtOT6rfAca8liOrdnmwn%2FaU1Ww55fpiv4KKPA87QUhI4aG6P0WDC9Vs18XSNuj6wpZXRF%2BE8T82O4IVfOnJ5fkRJqYKNpxPNXR6ImXtsA7fZqNuXXPqZsXfRUkag992mWTkwbsR%2Bdjm602OT8IEsF66Fwiym5LiIFa6bSr318qFI2uxlypg2Qrh1pHnRuvojjx8amXxt40L09C07ZqoAtvVx03JD1EB%2FV86IgqC8dmcShEe%2Fb4eZKpcBT2WMI4Sbyb2D6XTvTLzsaVIVH9gb866Gu9yGjCh2nj3U5ch%2B4DdXFgSBaoHY2yvGjd5YWNfpI3jNMvv5lkkztNiFBz3WkRKjRigBmX6DJvPvAL9FzRsz42qAUSeK9MepnxCH1sYI6shCTQpnYCjgS9P9O%2BhAL0OK%2B2Yangf9rrVu3KCS0tFjfeiHC7z0%2FmEaC1MiYiE0TqKAA1hE0OFfVUjaRMkYgsPRjSVdbotoP8v1'
            //     }
            // })).subscribe(response => this.tones = response.data.document_tone.tones)
        }
    }
});
