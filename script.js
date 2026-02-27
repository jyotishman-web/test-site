games.forEach(game => {

  const card = `
    <div class="game-card">
      <img src="${game.thumb}">
      <p>${game.title}</p>
    </div>
  `;

  document.getElementById(game.category).innerHTML += card;

});
