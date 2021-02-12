var app = new Vue({
  el: "#app",
  data: {
    query: "",
    results: [],
    availableFlags: ["it", "en"],
    apiKey: 'a6f281f5844e3986db3b0d8a66d93e94',
    url: 'https://image.tmdb.org/t/p/',
    imgSize: 'w342'

  },
  methods: {
    search() {
      const self = this;
      self.results = [];
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: this.apiKey,
            query: self.query,
            language: "it-IT"
          }
        })
        .then(function (response) {
          const results = response.data.results;
          self.results = self.results.concat(results);
        });
      axios
        .get("https://api.themoviedb.org/3/search/tv", {
          params: {
            api_key: this.apiKey,
            query: self.query,
            language: "it-IT"
          }
        })
        .then(function (response) {
          const results = response.data.results;
          self.results = self.results.concat(results);
          console.log(self.results);
        });
    },
    getVote(vote) {
      return parseInt(vote / 2);
    },
    getFlag(lang) {
      //Da far vedere nelle slide
      return `images/${lang}.png`;
    },
    getPoster(poster) {
      return `https://image.tmdb.org/t/p/w185/${poster}`;
    }
  }
});
