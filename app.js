var app = new Vue({
    el: '#app',
    data: {
        tones: []
    },
    created: function() {
        this.$http.get('http://localhost:4200/')
            .then((data) => {
                this.tones = data.body.tones
            })   
    }
});
