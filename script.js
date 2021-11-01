function Book(title,id,author,year,isComplete){
	this.title = title;
	this.id = id;
	this.author = author;
	this.year = year;
	this.isComplete = isComplete;
}

function clearForm(){
	document.querySelector("#title").value = "";
	document.querySelector("#author").value = "";
	document.querySelector("#year").value = "";
	document.querySelector("#check").checked = false;
}
function clearFormUpdate(){
	document.querySelector("#title-update").value = "";
	document.querySelector("#author-update").value = "";
	document.querySelector("#year-update").value = "";
}

function createBook(book_data){
	let firstShelf = document.querySelector(".first");
	let secondShelf = document.querySelector(".second");

	let book = document.createElement('div');
	book.className = "book";
	book.innerHTML += `<h3>${book_data.title}</h3><hr><table><tr><td>Id</td><td>:</td><td>${book_data.id}</td></tr><tr><td>Author</td><td>:</td><td>${book_data.author}</td></tr><tr><td>Year</td><td>:</td><td>${book_data.year}</td></tr></table><button class="action" onclick="deleteBook(event)">Delete</button><button class="action" onclick="readData(event)">Edit</button><button class="action" onclick="moveBook(event)">Move</button>`;

	if(book_data.isComplete === true){
		firstShelf.appendChild(book);
	}else{
		secondShelf.appendChild(book);
	}
	books.push(book);
	saveData(books_data);
}

function moveBook(event){
	const firstShelf = document.querySelector(".first");
	const secondShelf = document.querySelector(".second");

	let bookTarget = event.target.parentElement;
	let idx = books.indexOf(bookTarget);

	if(books_data[idx].isComplete === false){
		books_data[idx].isComplete = true;
	}else{
		books_data[idx].isComplete = false; 
	}
	createBook(books_data[idx]);
	books_data.push(books_data[idx]);
	books_data.splice(idx,1);
	books.splice(idx,1);
	bookTarget.parentNode.removeChild(bookTarget);
	saveData(books_data);
}

function deleteBook(event){
	if(confirm("Are you sure want to delete this book ?")){
		let bookTarget = event.target.parentElement;
		let idx = books.indexOf(bookTarget);
		books_data.splice(idx,1);
		books.splice(idx,1);
		bookTarget.parentNode.removeChild(bookTarget);
	}
	saveData(books_data);
}

function readData(event){
	const titleUpdate = document.querySelector("input#title-update");
	const authorUpdate = document.querySelector("input#author-update");
	const yearUpdate = document.querySelector("input#year-update");
	const updateButton = document.querySelector("button.updateData");

	let bookTarget = event.target.parentElement;
	let idx = books.indexOf(bookTarget);
	booksIndexTemp = idx;

	titleUpdate.value = books_data[idx].title;
	authorUpdate.value = books_data[idx].author;
	yearUpdate.value = books_data[idx].year;
	updateButton.disabled = false;

}
function updateButtonEvent(){
	const titleUpdate = document.querySelector("input#title-update");
	const authorUpdate = document.querySelector("input#author-update");
	const yearUpdate = document.querySelector("input#year-update");
	const updateButton = document.querySelector("button.updateData");

	books_data[booksIndexTemp].title = titleUpdate.value;
	books_data[booksIndexTemp].author = authorUpdate.value;
	books_data[booksIndexTemp].year = parseInt(yearUpdate.value);
	updateBook(books[booksIndexTemp],books_data[booksIndexTemp]);
	saveData(books_data);
	clearFormUpdate();
	booksIndexTemp = null;
	updateButton.disabled = true;
}

function updateBook(bookEl,bookObj){
	bookEl.childNodes[0].innerText = bookObj.title;
	bookEl.childNodes[2].childNodes[0].childNodes[1].childNodes[2].innerText = bookObj.author;
	bookEl.childNodes[2].childNodes[0].childNodes[2].childNodes[2].innerText = bookObj.year;
}

function hideBooks(){
	let allBooks = document.querySelectorAll("div.book");
	for(let i = 0; i < allBooks.length; i++){
		allBooks[i].classList.add("hidden");
	}
}
function unhideBooks(){
	let hiddenBooks = document.querySelectorAll("div.book.hidden");
	for(let i = 0; i < hiddenBooks.length; i++){
		hiddenBooks[i].classList.remove("hidden");
	}
}

function findBooks(key){
	for(let i = 0; i < books_data.length; i++){
		if(books_data[i].title.includes(key)){
			books[i].classList.remove("hidden");
		}
	}
}

function showBook(){
	if(checkStorage()){
		const firstShelf = document.querySelector(".first");
		const secondShelf = document.querySelector(".second");
		for(let i = 0; i < books_data.length; i++){
			let book = document.createElement('div');
			book.className = "book";
			book.innerHTML += `<h3>${books_data[i].title}</h3><hr><table><tr><td>Id</td><td>:</td><td>${books_data[i].id}</td></tr><tr><td>Author</td><td>:</td><td>${books_data[i].author}</td></tr><tr><td>Year</td><td>:</td><td>${books_data[i].year}</td></tr></table><button class="action" onclick="deleteBook(event)">Delete</button><button class="action" onclick="readData(event)">Edit</button><button class="action" onclick="moveBook(event)">Move</button>`;

			if(books_data[i].isComplete === true){
				firstShelf.appendChild(book);
			}else{
				secondShelf.appendChild(book);
			}
			books.push(book);
		}
	}
}

const books = [];
let booksIndexTemp;

showBook();

const addbookForm = document.querySelector("form.addBook");
addbookForm.addEventListener("submit",function(){
	const title = document.querySelector("#title").value;
	const id = 'b' + new Date().getTime();
	const author = document.querySelector("#author").value;
	const year = parseInt(document.querySelector("#year").value);
	const isComplete = document.querySelector("input#check").checked;

	let newbook = new Book(title,id,author,year,isComplete);

	books_data.push(newbook);
	createBook(newbook);

	clearForm();
	event.preventDefault();
});

const searchButton = document.querySelector("button.searchButton");
searchButton.addEventListener("click",function(){
	const searchKey = document.querySelector("input#search").value;
	if(searchKey !== ""){
		unhideBooks();
		hideBooks();
		findBooks(searchKey);
	}else{
		unhideBooks();
	}
	event.preventDefault();
});