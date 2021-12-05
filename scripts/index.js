const minecraft = {
  ROWS: 22,
  COLUMNS: 20,
  material: ["sky", "cloud", "leaves", "wood", "rock", "top-earth", "earth"],
  tools: {
    pickAxe: ["rock"],
    shovel: ["earth", "top-earth"],
    axe: ["leaves", "wood"],
  },
  inventory: [],
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

  selectedTool: "",

  // check if the tool and the tile has the same material if has return the material
  checkIfTileContainMaterial(tile, toolMaterialArray) {
    for (let index = 0; index < toolMaterialArray.length; index++) {
      if (tile.classList.contains(toolMaterialArray[index]))
        return toolMaterialArray[index];
    }
    return "";
  },

  removeSelected() {
    this.sideNavButtons.forEach((navButton) => {
      navButton.classList.remove("selected");
      this.inventoryElement.classList.remove("selected");
    });
  },

  //   selecting a tool event
  clickOnTool() {
    this.sideNavButtons.forEach((element) => {
      element.addEventListener("click", () => {
        this.selectedTool = element.getAttribute("data-tool");
        this.removeSelected();
        element.classList.add("selected");
      });
    });
  },

  //   selecting the inventory
  clickOnInventory() {
    this.inventoryElement.addEventListener("click", () => {
      this.selectedTool = "inventory";
      this.removeSelected();
      this.inventoryElement.classList.add("selected");
    });
  },

  addInventoryToGameBoard(tile) {
    const inventory = this.inventory;
    const inventoryElement = this.inventoryElement;

    tile.classList.add(inventory.pop());
    inventoryElement.classList = "";
    if (inventory.length > 0)
      inventoryElement.classList.add(
        "inventory",
        inventory[inventory.length - 1],
        "selected"
      );
    else inventoryElement.classList.add("inventory", "selected");
  },

  //   gameboard click event
  clickOnGameBoard() {
    this.gameBoard.addEventListener("click", (e) => {
      if (this.selectedTool === "") return;

      const selectedTile = e.target.closest("div");

      if (this.selectedTool === "inventory") {
        if (selectedTile.classList.length > 1) return;
        if (this.inventory.length === 0) return;
        this.addInventoryToGameBoard(selectedTile);
        return;
      }

      // get tile matrial
      const selectedToolMaterials = this.tools[this.selectedTool];
      const materialToRemove = this.checkIfTileContainMaterial(
        selectedTile,
        selectedToolMaterials
      );

      // remove tile and add material to inventory
      if (materialToRemove !== "") {
        selectedTile.classList.remove(materialToRemove);
        this.inventory.push(materialToRemove);
        this.inventoryElement.classList = "";
        this.inventoryElement.classList.add("inventory", materialToRemove);
      } else {
        if (
          selectedTile.classList.length > 1 &&
          !selectedTile.classList.contains(this.material[1])
        ) {
          const sideNavButtonsArr = [...this.sideNavButtons];
          const selecedToolElement = sideNavButtonsArr.find((navButton) =>
            navButton.classList.contains("selected")
          );
          selecedToolElement.classList.add("wrong-material");
          setTimeout(function () {
            selecedToolElement.classList.remove("wrong-material");
          }, 200);
        }
      }
    });
  },

  clickStartScreen() {
    this.startButton.addEventListener("click", () => {
      this.startScreen.classList.toggle("hidden");
    });
  },

  ResetGameBoard() {
    this.resetButton.addEventListener("click", () => {
      this.draw();
      this.inventory = [];
      this.removeSelected();
      this.selectedTool = "";
      this.inventoryElement.classList = "";
      this.inventoryElement.classList.add("inventory");
    });
  },

  initEvents() {
    this.clickStartScreen();
    this.clickOnTool();
    this.clickOnInventory();
    this.clickOnGameBoard();
    this.ResetGameBoard();
  },

  init() {
    this.startButton = document.querySelector(".start-button");
    this.startScreen = document.querySelector(".start-screen");
    this.gameBoard = document.querySelector(".game-board");
    this.inventoryElement = document.querySelector(".inventory");
    this.resetButton = document.querySelector(".reset-button");
    this.sideNavButtons = document.querySelectorAll(".side-nav-button");
    this.initEvents();
    this.draw();
  },

  draw() {
    this.gameBoard.textContent = "";
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLUMNS; j++) {
        const tile = document.createElement("div");
        tile.classList.add(this.material[0]);
        tile.setAttribute("xAxis", i);
        tile.setAttribute("yAxis", j);
        tile.classList.add(this.material[this.gameBoardArray[i][j]]);
        this.gameBoard.appendChild(tile);
        tile.addEventListener("click", () => {});
      }
    }
  },
};

minecraft.init();
