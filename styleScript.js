//cut function
function cutFunc() {
	if(lastCell) {
		let text = lastCell.innerText;
		lastCell.innerText = "";
		navigator.clipboard.writeText(text);
	}
}

//copy function
function copyFunc() {
	if(lastCell) {
		let text = lastCell.innerText;
		navigator.clipboard.writeText(text);
	}
}

//paste func
function pasteFunc() {
	if(lastCell) {
		let text = navigator.clipboard.readText();
		text.then(txt => { lastCell.innerText = txt; });
	}
}



let body = document.querySelector("body");

//alignment buttons
let alignButtons = document.querySelectorAll(".align");
for(let i = 0; i < 3; i++) {
	alignButtons[i].addEventListener("click", function(e){

		if(lastCell) {
			let cellAddress = lastCell.getAttribute("data-address");

			//checking if anyone is already selected or not
			for(let j = 0; j < 3; j++) {
				if(alignButtons[j].classList[4] == "selected") {
					alignButtons[j].classList.remove("selected");
				}
			}

			e.currentTarget.classList.add("selected");


			if(e.currentTarget.classList[3] == "left") {
				lastCell.style.justifyContent = "flex-start";
				dataObj[cellAddress].align = "left";
			}else if(e.currentTarget.classList[3] == "right") {
				lastCell.style.justifyContent = "flex-end";
				dataObj[cellAddress].align = "right";
			}else if(e.currentTarget.classList[3] == "center") {
				lastCell.style.justifyContent = "center";
				dataObj[cellAddress].align = "center";
			}

		}
	});
}



//color-picker = > text-color and bg-color
let colorBtns = document.querySelectorAll(".color-fill");
let bgColorFill = colorBtns[0];
let textColorFill = colorBtns[1];

bgColorFill.addEventListener("click", function() {

	let colorPickerElement = document.querySelector("input[name='bg-color-fill']");
	colorPickerElement.click();

		colorPickerElement.addEventListener("input", function (e) {
		 
		    if (lastCell) {
		      let address = lastCell.getAttribute("data-address");		
		      lastCell.style.backgroundColor = e.currentTarget.value;
		      dataObj[address].bgColor = e.currentTarget.value;
		    }
		});

});


textColorFill.addEventListener("click", function() {

	let colorPickerElement = document.querySelector("input[name='text-color-fill']");
	colorPickerElement.click();

		colorPickerElement.addEventListener("input", function (e) {
		 
		    if (lastCell) {
		      let address = lastCell.getAttribute("data-address");	
		      lastCell.style.color = e.currentTarget.value;
		      dataObj[address].color = e.currentTarget.value;
		    }
		});

});



//text-format
let textAlignBtns = document.querySelectorAll(".textFormat");

for(let i = 0; i < 3; i++) {
	textAlignBtns[i].addEventListener("click", function(e){

		if(lastCell) {
			let cellAddress = lastCell.getAttribute("data-address");

			//checking if anyone is already selected or not
			for(let j = 0; j < 3; j++) {
				if(textAlignBtns[j].classList[4] == "selected") {
					textAlignBtns[j].classList.remove("selected");
				}
			}


			//jispr click hua hai or jispr class selected thi usme se ab remove krenge for toggle effect
			if(e.currentTarget.classList[3] != dataObj[cellAddress].textFormat) {
				e.currentTarget.classList.add("selected");
			}



	
			if(dataObj[cellAddress].textFormat == "bold") {
				lastCell.style.fontWeight = "normal";
			}else if(dataObj[cellAddress].textFormat == "italic") {
				lastCell.style.fontStyle = "normal";
			}else if(dataObj[cellAddress].textFormat == "underline") {
				lastCell.style.textDecoration = "none";
			}
			


			if(e.currentTarget.classList[3] != dataObj[cellAddress].textFormat) {

				if(e.currentTarget.classList[3] == "bold") {
					lastCell.style.fontWeight = "bold";
					dataObj[cellAddress].textFormat = "bold";

				}else if(e.currentTarget.classList[3] == "italic") {

					lastCell.style.fontStyle  = "italic";
					dataObj[cellAddress].textFormat = "italic";

				}else if(e.currentTarget.classList[3] == "underline") {

					lastCell.style.textDecoration = "underline";
					dataObj[cellAddress].textFormat = "underline";
				}
			} else {
				dataObj[cellAddress].textFormat = "";
			}



		}

	});
}





let fontFamilyMenu = document.querySelector(".font-style");
fontFamilyMenu.addEventListener("change", function(e){
	if(lastCell) {

		let cellAddress = lastCell.getAttribute("data-address");
		let newFont = e.currentTarget.value;

		if(newFont == "f2") {
			lastCell.style.fontFamily = "Arial, sans-serif";
			dataObj[cellAddress].fontFamily = "f2";
		}else if (newFont == "f3") {
			lastCell.style.fontFamily = "'Caladea', serif";
			dataObj[cellAddress].fontFamily = "f3";
		}else if (newFont == "f4") {
			lastCell.style.fontFamily = "'Brush Script MT',cursive";
			dataObj[cellAddress].fontFamily = "f4";
		}else if (newFont == "f5") {
			lastCell.style.fontFamily = "Georgia, serif";
			dataObj[cellAddress].fontFamily = "f5";
		}else if (newFont == "f6") {
			lastCell.style.fontFamily = "Papyrus, fantasy";
			dataObj[cellAddress].fontFamily = "f6";
		}else if(newFont == "f7"){
			lastCell.style.fontFamily = "fangsong";
			dataObj[cellAddress].fontFamily = "f7";
		}else if (newFont == "f8") {
			lastCell.style.fontFamily = "Copperplate, fantasy";
			dataObj[cellAddress].fontFamily = "f8";
		}else if (newFont == "f9") {
			lastCell.style.fontFamily = "'Lucida Handwriting',cursive";
			dataObj[cellAddress].fontFamily = "f9";
		}else if (newFont == "f10") {
			lastCell.style.fontFamily = "'Zen Tokyo Zoo', cursive";
			dataObj[cellAddress].fontFamily = "f10";
		}
	}
});


let fonSizeMenu = document.querySelector(".font-size");
fonSizeMenu.addEventListener("change", function(e){

	let cellAddress = lastCell.getAttribute("data-address");
	let newFontSize = e.currentTarget.value;

	if(newFontSize == "8") {
		lastCell.style.fontSize = "8px";
		dataObj[cellAddress].fontSize = "8"
	}else if (newFontSize == "10") {
		lastCell.style.fontSize = "10px";
		dataObj[cellAddress].fontSize = "10"
	}else if(newFontSize == "12") {
		lastCell.style.fontSize = "12px";
		dataObj[cellAddress].fontSize = "12"
	}else if(newFontSize == "14") {
		lastCell.style.fontSize = "14px";
		dataObj[cellAddress].fontSize = "14"
	}else if(newFontSize == "16") {
		lastCell.style.fontSize = "16px";
		dataObj[cellAddress].fontSize = "16"
	}else if(newFontSize == "20") {
		lastCell.style.fontSize = "20px";
		dataObj[cellAddress].fontSize = "20"
	}else if(newFontSize == "22"){
		lastCell.style.fontSize = "22px";
		dataObj[cellAddress].fontSize = "22"
	}
});



//menu options section
let menuBtns = document.querySelectorAll(".menu-bar-section > div");
let fileBtn = menuBtns[0];
let helpBtn = menuBtns[2];

let myContainer = document.querySelector(".mycontainer");

fileBtn.addEventListener("click", function() {

	let div = document.createElement("div");
		div.id = "file";
		div.classList.add("fileOptions");
		div.innerHTML = `<div>Save</div>
						 <div>Clear</div>`;

	if(document.getElementById("file")) {
		fileBtn.classList.remove("selected");
		document.getElementById("file").remove();
	}else {
		
		myContainer.append(div);
		fileBtn.classList.add("selected");

		let saveBtn = document.querySelector("#file > div:nth-child(1)");

		saveBtn.addEventListener("click", function() {
			let sheet1 = {
				title: document.querySelector(".title-section>div").innerText,
				data: dataObj
			}

			localStorage.setItem("sheets", JSON.stringify(sheet1));

			let alertDv = document.createElement("div");
			alertDv.classList.add("alert");
			alertDv.classList.add("alert-success");
			alertDv.setAttribute("role", "alert");
			alertDv.innerHTML = `<div class="close-alert">X</div>
	  							  File saved successfully.`
	  		myContainer.append(alertDv);

	  		document.querySelector(".close-alert").addEventListener("click", function() {
	  			document.querySelector(".alert").remove();
	  		});

	  		fileBtn.classList.remove("selected");
			document.getElementById("file").remove();
		});

		let clearBtn = document.querySelector("#file > div:nth-child(2)");

		clearBtn.addEventListener("click", function() {
			localStorage.setItem("sheets", "");
			location.reload();
		})

	}

});




helpBtn.addEventListener("click", function() {

	if(document.querySelector("#file")) {
		fileBtn.classList.remove("selected");
		document.querySelector("#file").remove();
	}

});

