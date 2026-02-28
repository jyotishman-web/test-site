function render(sectionId, category) {
  const container = document.getElementById(sectionId);

  GAMES
    .filter(g => g.category === category)
    .forEach(game => {
      container.innerHTML += `
        <div class="card">
          <a href="${game.page}">
            <img src="${game.thumb}">
            <h3>${game.name}</h3>
          </a>
        </div>
      `;
    });
}

render("featured", "featured");
render("popular", "popular");
render("new", "new");
