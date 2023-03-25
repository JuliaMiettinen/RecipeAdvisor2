const form = document.querySelector('form[action=""]');
const input = document.querySelector('input');
const resultsList = document.querySelector('#results-list');
console.log(resultsList);
const searchBtn = document.querySelector('#search-btn');

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", function (event) {
  searchMeals(event);
});

searchBtn.addEventListener('click', (event) => {
    console.log('Search button clicked');
    searchMeals();
  });  

async function searchMeals(event) {
    event.preventDefault();
    const ingredients = document.getElementById("txtName").value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredients}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayMeals(data.meals))
      .catch((error) => console.log("Error while fetching data: " + error));
  }  

function displayMeals(meals) {
  console.log('Meals received:', meals);
  resultsList.innerHTML = '';
  if (meals === null) {
    resultsList.innerHTML = '<li>No results found</li>';
  } else {
    meals.forEach(meal => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p>Ingredients: ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient5}, ${meal.strIngredient6}, ${meal.strIngredient7}, ${meal.strIngredient8}, ${meal.strIngredient9}, ${meal.strIngredient10}</p>
        <p>Instructions: ${meal.strInstructions}</p>
      `;
      resultsList.appendChild(li);
    });
  }
}
