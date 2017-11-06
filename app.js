var app = new Vue({
    el: '#app',
    data: {
        tones: [],
        tweets: [],
        analyzed: 0,
        loading: false,
        hashtag: 'bitcoin',
    },
    methods: {
        analyze: function() {
            if (Boolean(this.hashtag)) {
                this.loading = true;
                this.$http.post('http://localhost:4200/', {
                    hashtag: this.hashtag
                }).then((data) => {
                    this.tones = data.body.tones
                    this.tweets = data.body.tweets
                    this.loading = false;
                })
            }
        }
    }
});
