// games.js - Simplified version with built-in data
document.addEventListener('DOMContentLoaded', function() {
    // Sample games data directly in JavaScript
    const gamesData = {
        categories: ['Action', 'Puzzle', 'Strategy', 'Sports', 'Arcade', 'Racing', 'Adventure'],
        games: [
            {
                id: 1,
                title: "Space Shooter",
                description: "Defend Earth from alien invasion!",
                image: "https://via.placeholder.com/300x200/FF6B6B/ffffff?text=Space+Shooter",
                category: "Action",
                gameCode: "path/to/your/game1.html", // Your HTML game file
                featured: true
            },
            {
                id: 2,
                title: "Memory Puzzle",
                description: "Test your memory with this fun puzzle",
                image: "https://via.placeholder.com/300x200/4ECDC4/ffffff?text=Memory+Puzzle",
                category: "Puzzle",
                gameCode: "path/to/your/game2.html",
                featured: true
            },
            {
                id: 3,
                title: "Chess Master",
                description: "Classic strategy game",
                image: "https://via.placeholder.com/300x200/45B7D1/ffffff?text=Chess",
                category: "Strategy",
                gameCode: "path/to/your/game3.html",
                featured: false
            }
        ]
    };

    // Display categories
    const categoryList = document.getElementById('categoryList');
    if (categoryList) {
        gamesData.categories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'category-item';
            div.textContent = category;
            div.onclick = () => filterByCategory(category);
            categoryList.appendChild(div);
        });
    }

    // Display featured games
    const featuredGrid = document.getElementById('featuredGames');
    if (featuredGrid) {
        const featuredGames = gamesData.games.filter(game => game.featured);
        featuredGames.forEach(game => {
            const card = createGameCard(game);
            featuredGrid.appendChild(card);
        });
    }

    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.onclick = () => playGame(game.gameCode);
        
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <span class="game-category">${game.category}</span>
            </div>
        `;
        return card;
    }

    function playGame(gameCode) {
        // Open your HTML game file
        if (gameCode) {
            window.location.href = gameCode;
        } else {
            alert('Game coming soon!');
        }
    }

    function filterByCategory(category) {
        window.location.href = `games.html?category=${encodeURIComponent(category)}`;
    }
});
