const featured = document.getElementById("featured");

GAMES.forEach(game => {
  featured.innerHTML += `
    <div class="card">
      <a href="${game.page}">
        <img src="${game.thumb}">
        <h3>${game.name}</h3>
      </a>
    </div>
  `;
});
