// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto
// Se vi rimane tempo pensate anche alla copertina
// Milestone 3:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
// al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
// perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
// Dovremo prendere quindi l’URL base delle immagini di TMDB:
// https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
// (troviamo tutte le dimensioni possibili a questo link:
// https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400 ) per poi aggiungere la
// parte finale dell’URL passata dall’API.
// Esempio di URL:
// https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

var app = new Vue ({
  el : '#app',
  data: {
    apiKey: 'a6f281f5844e3986db3b0d8a66d93e94',
    query: '',
    lang: '',
    risultati: [],
    url: 'https://image.tmdb.org/t/p/',
    imgSize: 'w342',
    imgPath: '',
    // coverImg: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
    menu: [
      'Film',
      'Serie tv',
      'La mia lista'
    ],
    casella: '',
    flags: [
      "en",
      "it"
    ],
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'


  },
  methods: {
    retrieveData(){
      if (this.query.length > 0) {
        axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: this.apiKey,
            query: this.query,
          }
        })
        .then((result) => {
          this.risultati = result.data.results;


          // retrieve cast
          getCast(this.risultati);
          console.log(this.risultati);
        })
        .catch((error) => alert('this API (movie) does not work'));
      } else if (this.query.length == 0){
        this.risultati = '';
      }




      // per le serie tv
      if (this.query.length > 0){
        axios
        .get("https://api.themoviedb.org/3/search/tv", {
          params: {
            api_key: this.apiKey,
            query: this.query
          }
        })
        .then((result) => {
          this.risultati = this.risultati.concat(result.data.results);
          console.log(this.risultati);
        })
        .catch((error) => alert('this API (tv) does not work'));
      } else if (this.query.length == 0){
        this.risultati = '';
      }

    },
    stelleColorate(arg){
      return parseInt(arg / 2);
    },
    getLanguageImg(language){
      if (this.flags.includes(language)){
        return language;
      }
    },
    getCast(array){
      const property = 'cast';
      for (let k in array){
        Vue.set(array,property,10);
        this.$forceUpdate();
      }
    }
  }
});
