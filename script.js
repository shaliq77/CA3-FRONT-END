document.addEventListener("DOMContentLoaded", function() {
    showRandomMeal();
});

function showRandomMeal() {
    const randomMealContainer = document.getElementById("random-meal");
    const randomMealTitle = document.getElementById("random-meal-title");
    const randomMealImage = document.getElementById("random-meal-image");
    const lookupRandomApiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch(lookupRandomApiUrl)
        .then(response => response.json())
        .then(data => {
            const randomMeal = data.meals[0];
            randomMealTitle.textContent = randomMeal.strMeal;
            randomMealImage.src = randomMeal.strMealThumb;
            randomMealContainer.onclick = function() { showPopup(randomMeal.idMeal); };
        })
        .catch(error => console.error('Error:', error));
        document.getElementById("meal-container").style.display = "none";
}


function searchMeals() {
    const searchInput = document.getElementById("mealInput").value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    
    document.getElementById("random-meal").style.display = "none";
    document.getElementById("meal-container").style.display = "block";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayMeals(data.meals))
        .catch(error => console.error('Error:', error));
}

function displayMeals(meals) {
    const mealContainer = document.getElementById("meal-container");
    mealContainer.innerHTML = "";

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("meal-card");

        const title = document.createElement("h2");
        title.textContent = meal.strMeal;

        const image = document.createElement("img");
        image.src = meal.strMealThumb;

        card.appendChild(title);
        card.appendChild(image);
        mealContainer.appendChild(card);

        card.onclick = function() { showPopup(meal.idMeal); };
    });
}


function handleMealContainerClick(event) {
    const clickedElement = event.target;

    
    if (clickedElement.classList.contains("meal-card")) {
        const mealId = clickedElement.querySelector("img").getAttribute("data-meal-id");
        showPopup(mealId);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    

    
    document.addEventListener("click", function(event) {
        const popup = document.getElementById("popup");

        
        if (event.target !== popup && !popup.contains(event.target)) {
            closePopup();
        }
    });
});


function showPopup(mealId) {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popup-content");

    const lookupApiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(lookupApiUrl)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            popupContent.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="recipe-steps">
                    <h3>Ingredients</h3>
                    <ul>
                        ${generateIngredientsList(meal)}
                    </ul>
                    <h3>Instructions</h3>
                    <p>${meal.strInstructions}</p>
                </div>
            `;
            popup.style.display = "block";
        })
        .catch(error => console.error('Error:', error));
}

function generateIngredientsList(meal) {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}


function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

function regenerateRandomMeal() {
    location.reload();
    document.getElementById("meal-container").style.display = "none";
}
