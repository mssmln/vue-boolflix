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
    risultatiMovie: '',
    url: 'https://image.tmdb.org/t/p/',
    imgSize: 'w342',
    imgPath: '',
    risultatiTv: '',
    coverImg: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
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
  mounted(){
    console.log(this.flags);
  },
  methods: {
    retrieveData(){
      // per i film
      if (this.query.length > 0) {
        axios
        .get("https://api.themoviedb.org/3/search/movie", {

          params: {
            api_key: this.apiKey,
            query: this.query,
            // language: this.lang
          }
        })
        .then((result) => {
          this.risultatiMovie = result.data.results;
          console.log(this.risultatiMovie);


          // in case poster path is null we attach another img
          this.risultatiMovie.forEach((item) => {
            if (item.poster_path == null) {
              item.poster_path = this.coverImg;
              console.log(item.poster_path);
            }
          });

          // in case overview is ""
          this.risultatiMovie.forEach((item) => {
            if (item.overview == ""){
              item.overview = this.lorem;
            }
          });

        })
        .catch((error) => alert('this API (movie) does not work'));

      } else if (this.query.length == 0){
        this.risultatiMovie = '';
      }


      // per le serie tv
      if (this.query.length > 0){
        axios
        .get("https://api.themoviedb.org/3/search/tv", {
          params: {
            api_key: this.apiKey,
            query: this.query,
            // language: this.lang
          }
        })
        .then((result) => {
          console.log(result.data);
          this.risultatiTv = result.data.results;
          console.log(this.risultatiTv);

          // in case poster path is null we attach another img
          this.risultatiTv.forEach((item) => {
            if (item.poster_path == null) {
              item.poster_path = this.coverImg;
              console.log(item.poster_path);

            }
          });

          // in case overview is ""
          this.risultatiTv.forEach((item) => {
            if (item.overview == ""){
              item.overview = this.lorem;
            }
          });

        })
        .catch((error) => alert('this API (tv) does not work'));

      } else if (this.query.length == 0){
        this.risultatiTv = '';
      }

    },
    stelleColorate(arg){
      return parseInt(arg / 2);
    },
    getLanguageImg(){
      if (this.risultatiMovie.original_language){
        this.risultatiMovie.original_language = this.flags[0] + '.png';
        
        return this.risultatiMovie.original_language;
      }
    },
    // filtra(index){
    //   this.casella = this.menu[index];
    //   console.log(this.casella);
    //   while (true) {
    //
    //   }
    //   if (this.casella == this.menu[0]){
    //     this.risultatiTv = '';
    //   } else if (this.casella == this.menu[1]){
    //     this.risultatiMovie = '';
    //   }
    //
    // }
    // swapImg(array){ // se è null poster_path metti logo netflix
    //   // in case poster path is null we attach another img
    //   array.forEach((item) => {
    //     if (item.poster_path == null) {
    //       item.poster_path = this.coverImg;
    //     }
    //   });
    // }
  }
});
