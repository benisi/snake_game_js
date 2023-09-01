import "./style.css";
import Game from "./game.js";

document.querySelector("#app").innerHTML = `
<div id="container" class="container">
  <div id="score"></div>
  <div id="board" class="board"></div>
</div>
`;

const game = new Game();
game.start();
