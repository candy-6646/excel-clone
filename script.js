
let rowNumberSection = document.querySelector(".row-number-section");

let formulaBarSelectedCellArea = document.querySelector(".selected-cell-div");

let lastCell;
let dataObj = {};

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

    })

    cellDiv.setAttribute("data-address", cellAddress);
    rowDiv.append(cellDiv);
  }

  cellSection.append(rowDiv);

}

dataObj["A1"].value = 20;
dataObj["A1"].downstream.push("A2");
dataObj["A2"].formula = "2 * A1";
dataObj["A2"].upstream.push("A1");
dataObj["A2"].value = 40;

let a1cell = document.querySelector("[data-address='A1']");
let a2cell = document.querySelector("[data-address='A2']");

a1cell.innerText = 20;
a2cell.innerText = 40;


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
