
let rowNumberSection = document.querySelector(".row-number-section");

let formulaBarSelectedCellArea = document.querySelector(".selected-cell-div");
let lastCell;

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

    let cellDiv = document.createElement("div");

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


