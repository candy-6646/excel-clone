//pesonal tasks

function myFunction() {
	var copyText = document.getElementById("myInput");
	copyText.select();
	copyText.setSelectionRange(0, 99999)
	document.execCommand("copy");
	alert("Copied the text: " + copyText.value);
}

let homeBtn = document.querySelector(".menu-bar-section > div:nth-child(2)");
homeBtn.classList.add("selected");

let w = window.innerWidth;

if(window.orientation > -1 || w < 700) {

	let toolsDiv = document.querySelector(".menu-bar-section > div:nth-child(4)");
	toolsDiv.remove();


	let span  = document.createElement("span");
	span.classList.add("mobile-menu");
	span.innerHTML = `<button type="button" class="btn btn-outline-dark"><i class="fa fa-bars" aria-hidden="true"></i></button>`;
	
	let navigation = document.querySelector(".navigation");
	navigation.append(span);	
	let navBtn = document.querySelector(".navigation>span>button");
	let navBtnVisibility = false;


	navBtn.addEventListener("click", function(){
		let ul = document.createElement("ul");
		ul.classList.add("list-group");
		ul.classList.add("mobile-menu-options");

		ul.innerHTML = `<button  class="btn btn-secondary share list-group-item"data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-share-square" aria-hidden="true"></i> Share</button>

			    <button class="btn btn-secondary comments list-group-item"><i class="fa fa-pencil-square" aria-hidden="true"></i>
			    Note</button>

			    <button class="btn btn-secondary user list-group-item"><i class="fa fa-user-circle" aria-hidden="true"></i> Profile</button>`;
		

		if(navBtnVisibility) {
			navBtnVisibility = false;
			let ul = document.querySelector(".mobile-menu-options");
			ul.remove();
		} else {
			navigation.append(ul);
			navBtnVisibility = true;

			let notesBtn = document.querySelector(".comments");
			let notesDiv = false;
			notesBtn.addEventListener("click", function(){

				if(userDiv) {
			  	userDiv = false;
			  	let div = document.querySelector(".card");
					div.remove();
			  }


				let div = document.createElement("div");
				div.classList.add("card");

				div.innerHTML = `		  <div class="card-header">
					    <i class="fa fa-book" aria-hidden="true"></i> Notes <i class="fa fa-times close" aria-hidden="true"></i>
					  </div>
					  <ul class="list-group list-group-flush">
					    <li class="list-group-item tasks">Eat</li>
					    <li class="list-group-item tasks">Sleep</li>
					    <li class="list-group-item tasks">Code</li>
					  </ul>
					  <div class="tasks-container card-footer">
					  	<input type="" name="" id="task">
					  	<button type="button" class="btn btn-secondary" id="add-task"><i class="fa fa-plus" aria-hidden="true"></i></button>
					  </div>`;

					  

					  if(notesDiv) {
					  	notesDiv = false;
					  	let div = document.querySelector(".card");
					  	div.remove();

					  } else {
					  	notesDiv = true;
					  	let myContainer = document.querySelector(".mycontainer");
					  	myContainer.append(div);

					  	let addBtn = document.querySelector("#add-task");

					  	addBtn.addEventListener("click", function(){
					  		let task = document.querySelector("#task");
					  		let ul = document.querySelector(".mycontainer .card>ul");
					  		let newLi = document.createElement("li");
					  		newLi.classList.add("list-group-item");
					  		newLi.innerText = task.value;
					  		task.value = "";
					  		newLi.addEventListener("click", function(e){
					  				e.currentTarget.remove();
					  		});
					  		ul.append(newLi);
					  	});

					  	let task = document.querySelector("#task");
					  	task.addEventListener("keydown", function(e){
					  		if(e.key == "Enter") {

						  		let ul = document.querySelector(".mycontainer .card>ul");
						  		let newLi = document.createElement("li");
						  		newLi.classList.add("list-group-item");
						  		newLi.innerText = task.value;
						  		task.value = "";
						  		newLi.addEventListener("click", function(e){
						  				e.currentTarget.remove();
						  		});
						  		ul.append(newLi);
					  		}
					  	});
					  }

					  let closeNotesBtn = document.querySelector(".card .close");
					  if(notesDiv) {

						  closeNotesBtn.addEventListener("click", function(){
						  	notesDiv = false;
						  	let div = document.querySelector(".card");
						  	div.remove();
						  });

					  }

					  let allTasks = document.querySelectorAll(".card .tasks");
					  		for(let i = 0; i < allTasks.length; i++){
					  			allTasks[i].addEventListener("click", function(e){
					  				e.currentTarget.remove();
					  			});
					  	}

					  
			});


			let userBtn = document.querySelector(".user");
			let userDiv = false;

			userBtn.addEventListener("click", function(){

				if(notesDiv) {
					notesDiv = false;
					let div = document.querySelector(".card");
					div.remove();
				}

				let div = document.createElement("div");
				div.classList.add("card");
				div.classList.add("userInfo");
				div.style.padding = "10px";

				div.innerHTML = `<h2><i class="fa fa-user-circle-o" aria-hidden="true"></i></h2>
			  <div class="card-body">
			    <h5 class="card-title">Username</h5>
			    <p class="card-text">user123@gmail.com</p>
			    <a class="btn btn-primary"><i class="fa fa-sign-out" aria-hidden="true"></i> Log Out</a>
			    <button class="btn btn-secondary close-user">close</button>
			  </div>`;

			  if(userDiv) {
			  	userDiv = false;
			  	let div = document.querySelector(".card");
					div.remove();
			  } else {
			  	userDiv = true;
			  	let nav = document.querySelector(".navigation");
			  	nav.append(div);
			  }

			  if(userDiv) {
			  	let closeUserBtn = document.querySelector(".close-user");

			  	closeUserBtn.addEventListener("click", function(){
			  		userDiv = false;
			  		let div = document.querySelector(".card");
						div.remove();
			  	})
			  }

			});

		}

	});



	

} else {

	let addOptionsDiv = document.createElement("div");
	addOptionsDiv.classList.add("additional-options");

	addOptionsDiv.innerHTML = `<div class="btns"><img src="images/comments.png" class="comments"  style="height: 48px;width: 48px;"></div>
				
				<div class="btns"><button  class="btn btn-success share"data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-paper-plane" aria-hidden="true"></i> Share</button></div>

				<div class="btns"><button class="btn btn-danger user"><i class="fa fa-user" aria-hidden="true"></i></button></div>`;

	let nav = document.querySelector(".navigation");
	nav.append(addOptionsDiv);

	let notesBtn = document.querySelector(".comments");
	let notesDiv = false;
	notesBtn.addEventListener("click", function(){

		if(userDiv) {
	  	userDiv = false;
	  	let div = document.querySelector(".card");
			div.remove();
	  }


		let div = document.createElement("div");
		div.classList.add("card");

		div.innerHTML = `		  <div class="card-header">
			    <i class="fa fa-book" aria-hidden="true"></i> Notes <i class="fa fa-times close" aria-hidden="true"></i>
			  </div>
			  <ul class="list-group list-group-flush">
			    <li class="list-group-item">Eat</li>
			    <li class="list-group-item">Sleep</li>
			    <li class="list-group-item">Code</li>
			  </ul>
			  <div class="tasks-container card-footer">
			  	<input type="" name="" id="task">
			  	<button type="button" class="btn btn-secondary" id="add-task"><i class="fa fa-plus" aria-hidden="true"></i></button>
			  </div>`;

			  

			  if(notesDiv) {
			  	notesDiv = false;
			  	let div = document.querySelector(".card");
			  	div.remove();

			  } else {
			  	notesDiv = true;
			  	nav.append(div);

			  	let addBtn = document.querySelector("#add-task");

			  	addBtn.addEventListener("click", function(){
			  		let task = document.querySelector("#task");
			  		let ul = document.querySelector(".card>ul");
			  		let newLi = document.createElement("li");
			  		newLi.classList.add("list-group-item");
			  		newLi.innerText = task.value;
			  		task.value = "";
			  		newLi.addEventListener("click", function(e){
			  				e.currentTarget.remove();
			  		});
			  		ul.append(newLi);
			  	});

			  	let task = document.querySelector("#task");
					  	task.addEventListener("keydown", function(e){
					  	if(e.key == "Enter") {

						  	let ul = document.querySelector(".mycontainer .card>ul");
						  	let newLi = document.createElement("li");
						  	newLi.classList.add("list-group-item");
						  	newLi.innerText = task.value;
						  	task.value = "";
						  	newLi.addEventListener("click", function(e){
						  			e.currentTarget.remove();
						  	});
						  	ul.append(newLi);
					  	}
					});



			  }

			  let closeNotesBtn = document.querySelector(".card .close");
			  if(notesDiv) {

				  closeNotesBtn.addEventListener("click", function(){
				  	notesDiv = false;
				  	let div = document.querySelector(".card");
				  	div.remove();
				  });

			  }

			  let allTasks = document.querySelectorAll(".list-group-item");
			  		for(let i = 0; i < allTasks.length; i++){
			  			allTasks[i].addEventListener("click", function(e){
			  				e.currentTarget.remove();
			  			});
			  	}

			  
	});


	let userBtn = document.querySelector(".user");
	let userDiv = false;

	userBtn.addEventListener("click", function(){

		if(notesDiv) {
			notesDiv = false;
			let div = document.querySelector(".card");
			div.remove();
		}

		let div = document.createElement("div");
		div.classList.add("card");
		div.classList.add("userInfo");
		div.style.padding = "10px";

		div.innerHTML = `<h2><i class="fa fa-user-circle-o" aria-hidden="true"></i></h2>
	  <div class="card-body">
	    <h5 class="card-title">Username</h5>
	    <p class="card-text">user123@gmail.com</p>
	    <a class="btn btn-primary"><i class="fa fa-sign-out" aria-hidden="true"></i> Log Out</a>
	    <button class="btn btn-secondary close-user">close</button>
	  </div>`;

	  if(userDiv) {
	  	userDiv = false;
	  	let div = document.querySelector(".card");
			div.remove();
	  } else {
	  	userDiv = true;
	  	let nav = document.querySelector(".navigation");
	  	nav.append(div);
	  }

	  if(userDiv) {
	  	let closeUserBtn = document.querySelector(".close-user");

	  	closeUserBtn.addEventListener("click", function(){
	  		userDiv = false;
	  		let div = document.querySelector(".card");
				div.remove();
	  	})
	  }

	});
}
	


let fontFamilyMenu = document.querySelectorAll(".options");
for(let i = 0; i < 9; i++) {
	console.log(fontFamilyMenu[i]);
	fontFamilyMenu[i].addEventListener("click", function(e){
		console.log(fontFamilyMenu[i].classList[1])
	});
}


