// Load games data
let gamesData = null;

// Fetch games data when page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchGames();
});

function fetchGames() {
    fetch('games-data/games.json')
        .then(response => response.json())
        .then(data => {
            gamesData = data;
            initializePage();
        })
        .catch(error => {
            console.error('Error loading games:', error);
            // Fallback data if JSON fails to load
            gamesData = {
                categories: ['Action', 'Puzzle', 'Strategy', 'Sports', 'Arcade'],
                games: [
                    {
                        id: 1,
                        title: "Sample Game",
                        description: "This is a sample game description",
                        image: "https://via.placeholder.com/300x200",
                        category: "Action",
                        url: "#",
                        featured: true
                    }
                ]
            };
            initializePage();
        });
}

function initializePage() {
    // Load categories on homepage
    if (document.getElementById('categoryList')) {
        displayCategories();
    }
    
    // Load featured games on homepage
    if (document.getElementById('featuredGames')) {
        displayFeaturedGames();
    }
    
    // Load all games on games page
    if (document.getElementById('allGamesList')) {
        displayAllGames();
        populateCategoryFilter();
    }
}

function displayCategories() {
    const categoryList = document.getElementById('categoryList');
    if (!categoryList || !gamesData) return;
    
    categoryList.innerHTML = '';
    gamesData.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-item';
        categoryDiv.textContent = category;
        categoryDiv.onclick = () => filterByCategory(category);
        categoryList.appendChild(categoryDiv);
    });
}

function displayFeaturedGames() {
    const featuredGrid = document.getElementById('featuredGames');
    if (!featuredGrid || !gamesData) return;
    
    const featuredGames = gamesData.games.filter(game => game.featured);
    displayGames(featuredGames, featuredGrid);
}

function displayAllGames() {
    const gamesGrid = document.getElementById('allGamesList');
    if (!gamesGrid || !gamesData) return;
    
    displayGames(gamesData.games, gamesGrid);
}

function displayGames(games, container) {
    container.innerHTML = '';
    games.forEach(game => {
        const gameCard = createGameCard(game);
        container.appendChild(gameCard);
    });
}

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = () => playGame(game.url);
    
    card.innerHTML = `
        <img src="${game.image}" alt="${game.title}" onerror="this.src='https://via.placeholder.com/300x200'">
        <div class="game-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <span class="game-category">${game.category}</span>
        </div>
    `;
    
    return card;
}

function playGame(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    } else {
        alert('Game coming soon!');
    }
}

function filterByCategory(category) {
    // Redirect to games page with category filter
    window.location.href = `games.html?category=${encodeURIComponent(category)}`;
}

// Search and filter functions for games page
function searchGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filteredGames = gamesData.games;
    
    // Apply category filter
    if (categoryFilter !== 'all') {
        filteredGames = filteredGames.filter(game => game.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredGames = filteredGames.filter(game => 
            game.title.toLowerCase().includes(searchTerm) || 
            game.description.toLowerCase().includes(searchTerm)
        );
    }
    
    const gamesGrid = document.getElementById('allGamesList');
    displayGames(filteredGames, gamesGrid);
}

function filterGames() {
    searchGames(); // Reuse search function
}

function populateCategoryFilter() {
    const filter = document.getElementById('categoryFilter');
    if (!filter || !gamesData) return;
    
    gamesData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });
    
    // Check URL for category parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        filter.value = categoryParam;
        filterGames();
    }
}
