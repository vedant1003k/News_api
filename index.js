const API_KEY = "388139b5fb0942e290224585ff4a54ce";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Daily"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`); // async operation  so it will give promise on which we can await
  const data = await res.json();
  // url and query whatever related news u want and api_key after that is of form below
  // https://newsapi.org/v2/everything?q=tesla&from=2023-05-01&sortBy=publishedAt&apiKey=388139b5fb0942e290224585ff4a54ce

  // checking the data
  console.log(data);

  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-cards");

  cardsContainer.innerHTML = ""; //empty the card container so that card do not oveflow

  articles.forEach((article) => {
    if (!article.urlToImage) return; // only appending news which have image

    const cardClone = newsCardTemplate.content.cloneNode(true);

    //this means that all the content in template must be clone

    //Filling data in card
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} ·  ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNac = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNac?.classList.remove("active");
  curSelectedNac = navItem;
  curSelectedNac.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);

  curSelectedNac.classList.remove("active");
  curSelectedNac = null;
});

// scroll up

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (window.scrollY >= 660) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", scrollUp);

// smooth scroll

const scrollUpElement = document.getElementById("scroll-up");
scrollUpElement.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
