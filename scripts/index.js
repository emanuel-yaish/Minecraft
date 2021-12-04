const minecraft = {
  ROWS: 22,
  COLUMNS: 20,
  material: ["sky", "cloud", "leaves", "wood", "rock", "topEarth", "earth"],
  tools: {
    pickAxe: ["rock"],
    shovel: ["earth", "topEarth"],
    axe: ["leaves", "wood"],
  },
  inventory: "",
  gameBoard: "",
  gameBoardArray: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0, 4],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  ],
  //   sideNav: {
  //     pickAxe: "",
  //     shovel: "",
  //     axe: "",
  //     inventory: "",
  //   },
  selectedTool: "",

  // check if the tool and the tile has the same material if has return the material
  checkIfTileContainMaterial(tile, toolMaterialArray) {
    for (let index = 0; index < toolMaterialArray.length; index++) {
      if (tile.classList.contains(toolMaterialArray[index]))
        return toolMaterialArray[index];
    }
    return "material";
  },

  //   selecting a tool event
  clickOnTool() {
    const sideNavButtons = document.querySelectorAll(".side-nav-button");
    sideNavButtons.forEach((element) => {
      element.addEventListener("click", () => {
        this.selectedTool = element.getAttribute("data-tool");
      });
    });
    //   console.log(element.getAttribute("data-tool"));
    // });
    // console.log();
    // this.sideNav.pickAxe.addEventListener("click", (e) => {
    //   console.log("pickAxe");
    //   this.selectedTool = "pickAxe";
    // });
  },

  //   selecting the inventory
  clickOnInventory() {},

  //   gameboard click event
  clickOnGameBoard() {
    this.gameBoard.addEventListener("click", (e) => {
      if (this.selectedTool === "") return;

      // get tile
      const selectedTile = e.target.closest("div");
      const selectedToolMaterials = this.tools[this.selectedTool];
      const materialToRemove = this.checkIfTileContainMaterial(
        selectedTile,
        selectedToolMaterials
      );

      // remove tile
      if (materialToRemove !== "")
        selectedTile.classList.remove(materialToRemove);
    });
  },

  initEvents() {
    this.clickOnTool();
    this.clickOnInventory();
    this.clickOnGameBoard();
  },

  init() {
    this.gameBoard = document.querySelector(".game-board");
    // this.sideNav.pickAxe = document.querySelector(".pickAxe");
    // this.sideNav.shovel = document.querySelector(".shovel");
    // this.sideNav.axe = document.querySelector(".axe");
    // this.sideNav.inventory = document.querySelector(".inventory");
    this.initEvents();
    console.log(this.gameBoard);
    this.draw();
  },

  draw() {
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLUMNS; j++) {
        const tile = document.createElement("div");
        tile.classList.add(this.material[0]);
        tile.setAttribute("xAxis", i);
        tile.setAttribute("yAxis", j);
        console.log(i, j);
        tile.classList.add(this.material[this.gameBoardArray[i][j]]);
        this.gameBoard.appendChild(tile);
        tile.addEventListener("click", () => {});
      }
    }
  },
};

minecraft.init();

const startButton = document.querySelector(".start-button");
const startScreen = document.querySelector(".start-screen");
startButton.addEventListener("click", () => {
  startScreen.classList.toggle("hidden");
});
