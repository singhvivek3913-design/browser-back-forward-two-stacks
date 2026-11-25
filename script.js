
const recipes = [
    {
        id: 1,
        name: "Masala Dosa",
        category: "Breakfast",
        time: "25 min",
        level: "Easy",
        emoji: "🥞",
        description: "Crispy dosa filled with flavourful potato masala.",
        ingredients: [
            "Dosa batter",
            "2 boiled potatoes",
            "1 onion",
            "Mustard seeds",
            "Curry leaves",
            "Turmeric and salt"
        ],
        steps: [
            "Heat oil and add mustard seeds and curry leaves.",
            "Add onion, turmeric and mashed potatoes.",
            "Spread dosa batter on a hot pan and cook until crisp.",
            "Place potato masala inside, fold and serve."
        ]
    },

    {
        id: 2,
        name: "Veg Fried Rice",
        category: "Lunch",
        time: "20 min",
        level: "Easy",
        emoji: "🍚",
        description: "A quick one-pan meal with rice and vegetables.",
        ingredients: [
            "2 cups cooked rice",
            "Carrot",
            "Capsicum",
            "Spring onion",
            "Soy sauce",
            "Salt and pepper"
        ],
        steps: [
            "Heat a little oil in a pan.",
            "Add chopped vegetables and stir-fry.",
            "Add cooked rice, soy sauce, salt and pepper.",
            "Mix everything and garnish with spring onion."
        ]
    },

    {
        id: 3,
        name: "Paneer Butter Masala",
        category: "Dinner",
        time: "35 min",
        level: "Medium",
        emoji: "🍛",
        description: "Soft paneer cubes in creamy tomato gravy.",
        ingredients: [
            "200 g paneer",
            "3 tomatoes",
            "1 onion",
            "Ginger-garlic paste",
            "Cream",
            "Garam masala"
        ],
        steps: [
            "Cook onion and tomatoes until soft.",
            "Blend into a smooth paste.",
            "Heat the paste with ginger-garlic and spices.",
            "Add paneer and simmer for 5-7 minutes.",
            "Add cream and serve hot."
        ]
    },

    {
        id: 4,
        name: "Fruit Pancakes",
        category: "Breakfast",
        time: "15 min",
        level: "Easy",
        emoji: "🥞",
        description: "Soft pancakes topped with fresh seasonal fruits.",
        ingredients: [
            "1 cup flour",
            "1 cup milk",
            "1 tbsp sugar",
            "1 tsp baking powder",
            "Mixed fruits",
            "Honey"
        ],
        steps: [
            "Mix flour, milk, sugar and baking powder.",
            "Pour batter onto a warm greased pan.",
            "Cook both sides until golden.",
            "Top with fruits and honey."
        ]
    },

    {
        id: 5,
        name: "Chocolate Mug Cake",
        category: "Dessert",
        time: "8 min",
        level: "Easy",
        emoji: "🍫",
        description: "A quick chocolate treat made in a mug.",
        ingredients: [
            "4 tbsp flour",
            "2 tbsp cocoa powder",
            "2 tbsp sugar",
            "3 tbsp milk",
            "2 tbsp oil",
            "A pinch of baking powder"
        ],
        steps: [
            "Mix all dry ingredients in a microwave-safe mug.",
            "Add milk and oil and stir until smooth.",
            "Microwave for about 60-90 seconds.",
            "Let it cool briefly before eating."
        ]
    },

    {
        id: 6,
        name: "Fresh Garden Salad",
        category: "Lunch",
        time: "10 min",
        level: "Easy",
        emoji: "🥗",
        description: "A refreshing mix of crunchy vegetables.",
        ingredients: [
            "Cucumber",
            "Tomato",
            "Carrot",
            "Lettuce",
            "Lemon juice",
            "Salt and black pepper"
        ],
        steps: [
            "Wash and chop all vegetables.",
            "Add them to a large bowl.",
            "Mix lemon juice, salt and pepper.",
            "Pour dressing over salad and toss."
        ]
    }
];


// TWO STACKS
const backStack = [];
const forwardStack = [];

let currentPage = {
    type: "home",
    category: "All",
    search: ""
};


// HTML ELEMENTS
const homeView = document.getElementById("homeView");
const detailView = document.getElementById("detailView");

const recipeGrid = document.getElementById("recipeGrid");
const emptyMessage = document.getElementById("emptyMessage");

const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");

const searchInput = document.getElementById("searchInput");


// UPDATE BUTTONS
function updateNavigationButtons() {
    backBtn.disabled = backStack.length === 0;
    forwardBtn.disabled = forwardStack.length === 0;
}


// OPEN A NEW PAGE
function navigateTo(nextPage) {

    backStack.push({ ...currentPage });

    currentPage = { ...nextPage };

    // Clear forward history after new navigation
    forwardStack.length = 0;

    renderPage();
}


// GO BACK
function goBack() {

    if (backStack.length === 0) {
        return;
    }

    forwardStack.push({ ...currentPage });

    currentPage = backStack.pop();

    renderPage();
}


// GO FORWARD
function goForward() {

    if (forwardStack.length === 0) {
        return;
    }

    backStack.push({ ...currentPage });

    currentPage = forwardStack.pop();

    renderPage();
}


// DISPLAY CURRENT PAGE
function renderPage() {

    const isHome = currentPage.type === "home";

    homeView.hidden = !isHome;
    detailView.hidden = isHome;

    if (isHome) {

        searchInput.value = currentPage.search || "";

        setActiveCategory(currentPage.category || "All");

        renderRecipes();

    } else {

        renderRecipeDetails(currentPage.recipeId);

    }

    updateNavigationButtons();
}


// CATEGORY ACTIVE BUTTON
function setActiveCategory(category) {

    document.querySelectorAll(".category").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.category === category
        );

    });
}


// DISPLAY RECIPES
function renderRecipes() {

    const category = currentPage.category || "All";

    const search = (currentPage.search || "").toLowerCase();

    const filtered = recipes.filter(recipe => {

        const matchesCategory =
            category === "All" || recipe.category === category;

        const matchesSearch =
            recipe.name.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;

    });

    recipeGrid.innerHTML = "";

    emptyMessage.hidden = filtered.length !== 0;

    filtered.forEach(recipe => {

        const card = document.createElement("article");

        card.className = "recipe-card";

        card.innerHTML = `
            <div class="recipe-visual">
                ${recipe.emoji}
            </div>

            <div class="recipe-info">

                <span class="recipe-meta">
                    ${recipe.category}
                </span>

                <h3>${recipe.name}</h3>

                <p>${recipe.description}</p>

                <div class="card-bottom">
                    <span>◷ ${recipe.time}</span>
                    <span>${recipe.level}</span>
                </div>

            </div>
        `;

        card.addEventListener("click", () => {

            navigateTo({
                type: "detail",
                recipeId: recipe.id
            });

        });

        recipeGrid.appendChild(card);

    });
}


// DISPLAY RECIPE DETAILS
function renderRecipeDetails(recipeId) {

    const recipe = recipes.find(item => item.id === recipeId);

    if (!recipe) {

        currentPage = {
            type: "home",
            category: "All",
            search: ""
        };

        renderPage();

        return;
    }

    detailView.innerHTML = `

        <button class="back-home" id="allRecipesBtn">
            ← All recipes
        </button>

        <div class="detail-top">

            <div class="detail-visual">
                ${recipe.emoji}
            </div>

            <div class="detail-copy">

                <span class="recipe-meta">
                    ${recipe.category}
                </span>

                <h2>${recipe.name}</h2>

                <p>${recipe.description}</p>

                <div class="detail-stats">
                    <span>◷ ${recipe.time}</span>
                    <span>${recipe.level}</span>
                </div>

            </div>

        </div>

        <div class="detail-lists">

            <div>
                <h3>Ingredients</h3>

                <ul>
                    ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>

            <div>
                <h3>How to make it</h3>

                <ol>
                    ${recipe.steps.map(step => `<li>${step}</li>`).join("")}
                </ol>
            </div>

        </div>
    `;

    document.getElementById("allRecipesBtn")
        .addEventListener("click", () => {

            navigateTo({
                type: "home",
                category: "All",
                search: ""
            });

        });
}


// CATEGORY CLICK
document.getElementById("categoryList")
    .addEventListener("click", event => {

        const button = event.target.closest(".category");

        if (!button) {
            return;
        }

        navigateTo({
            type: "home",
            category: button.dataset.category,
            search: ""
        });

    });


// SEARCH
searchInput.addEventListener("input", event => {

    if (currentPage.type !== "home") {
        return;
    }

    currentPage.search = event.target.value;

    renderRecipes();

});


// BACK AND FORWARD BUTTONS
backBtn.addEventListener("click", goBack);

forwardBtn.addEventListener("click", goForward);


// HOME BUTTON
document.getElementById("brandHome")
    .addEventListener("click", event => {

        event.preventDefault();

        navigateTo({
            type: "home",
            category: "All",
            search: ""
        });

    });


// INITIAL PAGE
renderPage();
