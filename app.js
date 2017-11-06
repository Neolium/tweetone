var app = new Vue({
    el: '#app',
    data: {
        text: [],
        tones: []
    },
    created: function() {
        this.$http.get('http://localhost:4200/')
            .then((data) => {
                console.log(data)
                this.text = data.body.text.split('. ')
                this.tones = data.body.tones
            })   
    }
});
