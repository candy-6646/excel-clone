
let rowNumberSection = document.querySelector(".row-number-section");

let formulaBarSelectedCellArea = document.querySelector(".selected-cell-div");

let formulaInput = document.querySelector(".formula-input-section");

let lastCell;
let dataObj = {};



formulaInput.addEventListener("keydown", function(e) {

  if(e.key == "Enter") {

    console.log("Now evaluating formula");

    let typedFormula = e.currentTarget.value;

    if(!lastCell) return;

    let selectedCellAdd = lastCell.getAttribute("data-address");
    let cellObj = dataObj[selectedCellAdd];

    cellObj.formula = typedFormula;

    let upstream = cellObj.upstream;
    for(let k = 0; k < upstream.length; k++) {
      removeFromDownstream(upstream[k], selectedCellAdd);
    }

    cellObj.upstream = [];

    let formulaArr = typedFormula.split(" ");
    let cellsInFormula = [];

    for(let i = 0; i < formulaArr.length; i++) {

      if(formulaArr[i] != '+' && formulaArr[i] != '-' && formulaArr[i] != '*' && 
        formulaArr[i] != '/' && isNaN(formulaArr[i])) {
        cellsInFormula.push(formulaArr[i]);
      }
    }

    // console.log(cellsInFormula);
    //Mujhe add hona hai apne parents k downstream mein
    for(let i = 0; i < cellsInFormula.length; i++) {
      addToDownStream(cellsInFormula[i], selectedCellAdd);
    }

    cellObj.upstream = cellsInFormula;


    let valObj = {};

    //yaha pr hum basically upstream k bndo ki value key pair ki form mein get
    //krre hain ex: {A1 : 10, B1 : 30, C12 : 50}

    for(let i = 0; i < cellsInFormula.length; i++) {
      let cellValue = dataObj[cellsInFormula[i]].value;

      valObj[cellsInFormula[i]] = cellValue;
    }



    //yaha pr hmare pass jo formula ths ussme hum key like: A1, B1 inko inhi ki 
    //numeric value se update krre hain.
    //example - formula : (A1 + B1) => now : (10 + 30)

    for(let key in valObj) {
      typedFormula = typedFormula.replace(key, valObj[key]);
    }

    //Now an hum usse evaluate krre hain

    let newValue = eval(typedFormula);

    cellObj.value = newValue;

    let uiCell = document.querySelector(`[data-address='${selectedCellAdd}']`);
    uiCell.innerText = newValue;

    let downstream = cellObj.downstream;

    for (let i = 0; i < downstream.length; i++) {
      updateCell(downstream[i]);
    }

    dataObj[selectedCellAdd] = cellObj;

    formulaInput.value = "";
    
  }


});







let columnTagsSection = document.querySelector(".column-tag-section");
let cellSection = document.querySelector(".cell-section");

cellSection.addEventListener("scroll", function(e){
	rowNumberSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;

  columnTagsSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
});



for(let i = 1; i <= 100; i++){
	let div = document.createElement("div");

	div.innerText = i;
	div.classList.add("row-number");

	rowNumberSection.append(div);
}



for(let i = 0; i < 26; i++){
	let asciiCode = 65 + i;
	let reqAlphabet = String.fromCharCode(asciiCode);

	let div = document.createElement("div");
	div.innerText = reqAlphabet;
	div.classList.add("column-tag");
	columnTagsSection.append(div);
}



for (let i = 1; i <= 100; i++) {
  let rowDiv = document.createElement("div");
  rowDiv.classList.add("myrow");
                       //i = 1 [A1,B1..........Z1]
                       //i = 2 []
                       //.
                       //.
                       //i = 100 [A100.........z100]

  for (let j = 0; j < 26; j++) {       //i = 100   j = 25  asciiCode = 65+25=90  alpha = z  cellAdd = Z100
    // A to Z
    let asciiCode = 65 + j;

    let reqAlphabet = String.fromCharCode(asciiCode);

    let cellAddress = reqAlphabet + i;

    dataObj[cellAddress] = {
      value: undefined,
      formula: undefined,
      upstream: [],
      downstream: [],
      color: "black",
      align: "left",
      bgColor: "white",
      textFormat: "",
      fontSize: "14",
      fontFamily: "f2"
    };

    let cellDiv = document.createElement("div");

    cellDiv.addEventListener("input", function(e) {
      let currCellAddress = e.currentTarget.getAttribute("data-address");

      let currCellObj = dataObj[currCellAddress];

      currCellObj.value = e.currentTarget.innerText;
      currCellObj.formula = undefined;

      let currUpstream = currCellObj.upstream;

      for(let k = 0; k < currUpstream.length; k++) {
        removeFromDownstream(currUpstream[k], currCellAddress);
      }

      currCellObj.upstream = [];


      let currDownstream = currCellObj.downstream;

      for(let k = 0; k < currDownstream.length; k++) {
        updateCell(currDownstream[k]);
      }

      dataObj[currCellAddress] = currCellObj;

      console.log(dataObj);




    });

    cellDiv.classList.add("mycell");
    cellDiv.setAttribute("contenteditable", true);
    cellDiv.setAttribute("spellCheck", false);

    cellDiv.addEventListener("click", function(e){
    	if(lastCell){
    		lastCell.classList.remove("selected-cell");
    	}

    	e.currentTarget.classList.add("selected-cell");
    	let currCellAddress = e.currentTarget.getAttribute("data-address");
    	lastCell = e.currentTarget;

    	formulaBarSelectedCellArea.innerText = currCellAddress;


      //Now making changes in menu options according to cell


      //Alignment
      let alignButtons = document.querySelectorAll(".align");
      for(let p = 0; p < 3; p++) {
        if(alignButtons[p].classList[4] == "selected") {
          alignButtons[p].classList.remove("selected");
        }
      }

      if(dataObj[currCellAddress].align == "left") {
        alignButtons[0].classList.add("selected");
      }else if(dataObj[currCellAddress].align == "center") {
        alignButtons[1].classList.add("selected");
      }else if(dataObj[currCellAddress].align == "right") {
        alignButtons[2].classList.add("selected");
      }


      //color-picker
      let bgColorPicker = document.querySelector("input[name='bg-color-fill']");
      let textColorPicker = document.querySelector("input[name='text-color-fill']");

      bgColorPicker.value = dataObj[cellAddress].bgColor;
      textColorPicker.value = dataObj[cellAddress].color;


      //textFormat
      let textAlignBtns = document.querySelectorAll(".textFormat");
      for(let p = 0; p < 3; p++) {
        if(textAlignBtns[p].classList[4] == "selected") {
          textAlignBtns[p].classList.remove("selected");
        }
      }

      if(dataObj[currCellAddress].textFormat == "bold") {
        textAlignBtns[0].classList.add("selected");
      }else if(dataObj[currCellAddress].textFormat == "italic") {
        textAlignBtns[1].classList.add("selected");
      }else if(dataObj[currCellAddress].textFormat == "underline") {
        textAlignBtns[2].classList.add("selected");
      }

      //font
      let fontFamilyMenu = document.querySelector(".font-style");
      fontFamilyMenu.value = dataObj[cellAddress].fontFamily;

      let fonSizeMenu = document.querySelector(".font-size");
      fonSizeMenu.value = dataObj[cellAddress].fontSize;

    });

    cellDiv.setAttribute("data-address", cellAddress);
    rowDiv.append(cellDiv);
  }

  cellSection.append(rowDiv);

}


if(localStorage.getItem("sheets")) {

  let sheet1 = JSON.parse(localStorage.getItem("sheets"));

  dataObj = sheet1.data;

  document.querySelector(".title-section>div").innerText = sheet1.title;

  for(let x in dataObj) {

    let cell = document.querySelector(`[data-address='${x}']`);
    if(dataObj[x].value) cell.innerText = dataObj[x].value;

    cell.style.color = dataObj[x].color;
    cell.style.backgroundColor = dataObj[x].bgColor;

    if(dataObj[x].align == "left") {
      cell.style.justifyContent = "flex-start";
    }else if(dataObj[x].align == "right") {
      cell.style.justifyContent = "flex-end";
    }else if(dataObj[x].align == "center") {
      cell.style.justifyContent = "center";
    }


    if(dataObj[x].textFormat == "bold") {
        cell.style.fontWeight = "bold";
    }else if(dataObj[x].textFormat == "italic") {
        cell.style.fontStyle = "italic";
    }else if(dataObj[x].textFormat == "underline") {
        cell.style.textDecoration = "underline";
    }

    let newFontSize = dataObj[x].fontSize;
    if(newFontSize == "8") {
    cell.style.fontSize = "8px";
    }else if (newFontSize == "10") {
      cell.style.fontSize = "10px";
    }else if(newFontSize == "12") {
      cell.style.fontSize = "12px";
    }else if(newFontSize == "14") {
      cell.style.fontSize = "14px";
    }else if(newFontSize == "16") {
      cell.style.fontSize = "16px";
    }else if(newFontSize == "20") {
      cell.style.fontSize = "20px";
    }else if(newFontSize == "22"){
      cell.style.fontSize = "22px";
    }


    let newFont = dataObj[x].fontFamily;
    if(newFont == "f2") {
      cell.style.fontFamily = "Arial, sans-serif";
    }else if (newFont == "f3") {
      cell.style.fontFamily = "'Caladea', serif";
    }else if (newFont == "f4") {
      cell.style.fontFamily = "'Brush Script MT',cursive";
    }else if (newFont == "f5") {
      cell.style.fontFamily = "Georgia, serif";
    }else if (newFont == "f6") {
      cell.style.fontFamily = "Papyrus, fantasy";
    }else if(newFont == "f7"){
      cell.style.fontFamily = "fangsong";
    }else if (newFont == "f8") {
      cell.style.fontFamily = "Copperplate, fantasy";
    }else if (newFont == "f9") {
      cell.style.fontFamily = "'Lucida Handwriting',cursive";
    }else if (newFont == "f10") {
      cell.style.fontFamily = "'Zen Tokyo Zoo', cursive";
    }

  }

}

// dataObj["A1"].value = 20;
// dataObj["A1"].downstream.push("A2");
// dataObj["A2"].formula = "2 * A1";
// dataObj["A2"].upstream.push("A1");
// dataObj["A2"].value = 40;

// let a1cell = document.querySelector("[data-address='A1']");
// let a2cell = document.querySelector("[data-address='A2']");

// a1cell.innerText = 20;
// a2cell.innerText = 40;


function removeFromDownstream(parentCell, childCell) {
  let parentDownstream = dataObj[parentCell].downstream;
  let filteredDownstream = [];

  for(let i = 0; i < parentDownstream.length; i++) {

    if(parentDownstream[i] != childCell) {
      filteredDownstream.push(parentDownstream[i]);
    }
  }

  dataObj[parentCell].downstream = filteredDownstream;
}



function updateCell(cell) {
  let cellObj = dataObj[cell];
  let upstream = cellObj.upstream;
  let formula = cellObj.formula;


  let valObj = {};

  for(let i = 0; i < upstream.length; i++) {
    let cellValue = dataObj[upstream[i]].value;

    valObj[upstream[i]] = cellValue;
  }


  for(let key in valObj) {
    formula = formula.replace(key, valObj[key]);
  }

  let newValue = eval(formula);

  dataObj[cell].value = newValue;

  let uiCell = document.querySelector(`[data-address='${cell}']`);
  uiCell.innerText = newValue;

  let downstream = cellObj.downstream;

  for (let i = 0; i < downstream.length; i++) {
    updateCell(downstream[i]);
  }
}


function addToDownStream(parentCell, childCell) {

  dataObj[parentCell].downstream.push(childCell);
}
