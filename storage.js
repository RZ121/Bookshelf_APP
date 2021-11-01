const SHELF_KEY = "bookshelf";
let books_data = null;

function checkStorage(){
	const check = (typeof(Storage) !== "undefined");
	if(check){
		if(localStorage.getItem(SHELF_KEY) === null){
			books_data = [];
		}else{
			books_data = JSON.parse(localStorage.getItem(SHELF_KEY));
		}
		return true;
	}else{
		alert("Browser anda tidak mendukung web storage");
		return false;
	}
}

function saveData(books_data){
	localStorage.setItem(SHELF_KEY, JSON.stringify(books_data));
}