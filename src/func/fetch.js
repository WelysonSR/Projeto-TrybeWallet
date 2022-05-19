async function fetchCotacao() {
  const moedas = await fetch('https://economia.awesomeapi.com.br/json/all');
  const respons = await moedas.json();
  return respons;
}

export default fetchCotacao;
