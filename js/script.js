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
    lang: 'en',
    risultatiRicerca: '',
    url: 'https://image.tmdb.org/t/p/',
    imgSize: 'w342/',
    imgPath: ''
  },
  methods: {
    retrieveData(){
      axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: this.apiKey,
          query: this.query,
          language: this.lang
        }
      })
      .then((result) => {
        console.log(result.data);
        this.risultatiRicerca = result.data.results;
        this.imgPath = this.url + this.imgSize + result.data.results.poster_path;
        console.log(this.imgPath);
        console.log(result.data.results.poster_path);
        console.log(this.risultatiRicerca.poster_path);
      })
      .catch((error) => alert('this API does not work'));
    }
  }
});
