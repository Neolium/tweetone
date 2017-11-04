

var app = new Vue({
    el: '#app',
    data: {
        content: '"I hate you."',
        tones: []
    },
    methods: {
        go: function() {
            Rx.Observable.fromPromise(this.$http.post('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21', {
                text: this.content
            }, {
                headers: {
                    'X-Watson-Authorization-Token': 'xUxXOuPlu5fvjpOqYy2jzJsMpmpB66tzAaqacCHip1v%2FqRa8W0%2BnhcGRVhssR1SWQkHc9d3nJsMmSTMuh7H9RkmzTA8x3hUPXWi25FdhS64qwLs%2BzHyEfvk4k2TdRlZ0q4fO79NYf61Pefd5UbtDlMbUrubSA3FeBT6h8w5Gce81fJRGNodO2Iv4Vms6daq3fWCtxFkK%2BtnXuN17%2FUP%2FH%2BWVlHmknTAJ8FKMtlh1GqDJf0SXmnB4PQhpVnpLAPQGTefm3%2BnixtWhJ5Kc%2BVNW18UcJNPaiM1HB2OdLBwRHkVWQiaKycgdKQ47MtrGr%2FQSMF9QOUtjzXzbnnp3kMF9btj1TlIH4Lz8kPafeQmC4z2c5ySSxuLlZJ9dfONj96L6kNoB3m2lzAV9Kf6An1TucBs2LLpsptsR6BKHuFCL4jOjJ4v%2B8YwUFuZwWuiVq8fOtuUqH68HliIvrP1sBWh3Kqk08VIeAxrsDsWbxtZh6c6udD047%2FYcQjlTNuEHXtOT6rfAca8liOrdnmwn%2FaU1Ww55fpiv4KKPA87QUhI4aG6P0WDC9Vs18XSNuj6wpZXRF%2BE8T82O4IVfOnJ5fkRJqYKNpxPNXR6ImXtsA7fZqNuXXPqZsXfRUkag992mWTkwbsR%2Bdjm602OT8IEsF66Fwiym5LiIFa6bSr318qFI2uxlypg2Qrh1pHnRuvojjx8amXxt40L09C07ZqoAtvVx03JD1EB%2FV86IgqC8dmcShEe%2Fb4eZKpcBT2WMI4Sbyb2D6XTvTLzsaVIVH9gb866Gu9yGjCh2nj3U5ch%2B4DdXFgSBaoHY2yvGjd5YWNfpI3jNMvv5lkkztNiFBz3WkRKjRigBmX6DJvPvAL9FzRsz42qAUSeK9MepnxCH1sYI6shCTQpnYCjgS9P9O%2BhAL0OK%2B2Yangf9rrVu3KCS0tFjfeiHC7z0%2FmEaC1MiYiE0TqKAA1hE0OFfVUjaRMkYgsPRjSVdbotoP8v1'
                }
            })).subscribe(response => this.tones = response.data.document_tone.tones)
        }
    }
});
