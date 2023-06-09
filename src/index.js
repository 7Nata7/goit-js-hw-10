import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const cleanMarkup = ref => {
  if (ref) {
    ref.innerHTML = '';
  }
};

const onInput = e => {
  e.preventDefault();
  const textInput = e.target.value.trim();

  if (!textInput) {
    cleanMarkup(listEl);
    cleanMarkup(infoEl);
    return;
  }

  fetchCountries(textInput)
    .then(data => {
      console.log(data);
      
    if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
      }
      renderMarkup(data);
    })
    .catch(() => {
      cleanMarkup(listEl);
      cleanMarkup(infoEl);
      Notify.failure('Oops, there is no country with that name');
    });
};


const renderMarkup = data => {
  if (data.length === 1) {
    cleanMarkup(listEl);
    const markupInfo = createInfoMarkup(data);
    infoEl.innerHTML = markupInfo;
  } else {
    cleanMarkup(infoEl);
    const markupList = createListMarkup(data);
    listEl.innerHTML = markupList;
  }
};

const createListMarkup = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<h1><img src="${flags.png}" alt="${name.official}" width="60">
          ${name.official}</h1>`,
    )
    .join('');
};


const createInfoMarkup = data => {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.png}" alt="${name.official}" width="80">${
        name.official
      }</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
  );
};

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));