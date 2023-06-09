const URL = 'https://restcountries.com/v3.1/name';

const fetchCountries = async name => {
  const response = await fetch(`${URL}/${name}?fields=name,capital,population,flags,languages`);
  if (response.status === 404) {
    return Promise.reject(new Error());
  }
  return await response.json();
};

export { fetchCountries };