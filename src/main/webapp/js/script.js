const deleteGame = (id) => {
  console.log(id)
  const request = new XMLHttpRequest();
  const url = "/FTT-WEB-091/game?game-id=" + id
  request.open("DELETE", url, true);
  request.send();
  request.onload = function () {
    document.location.reload(true);
  }
}
const deleteMovie = (id) => {
  console.log(id)
  const request = new XMLHttpRequest();
  const url = "/FTT-WEB-091/movie?movie-id=" + id
  request.open("DELETE", url, true);
  request.send();
  request.onload = function () {
    document.location.reload(true);
  }

}

const trailer = (id,nome) => {
  console.log(id)
  const request = new XMLHttpRequest();
  const url = "/FTT-WEB-091/trailer?trailer-id=" + id
  request.open("GET", url, true);
  request.send();
  request.onload = function () {
  	window.localStorage.setItem("trailerName", nome);
    window.location.href = "trailer.html";
  }
}

let trailerName = {}
let localMovie = {}

const updateMovie = (id) => {
  console.log(id)
  const request = new XMLHttpRequest();
  const url = "/FTT-WEB-091/movie?movie-id=" + id
  request.open("GET", url, true);
  request.send();
  request.onload = function () {
    window.localStorage.setItem('localMovie', this.responseText);
    window.location.href = "update-movie.html";
  }
  

}

let localGame = {}

const updateGame = (id) => {
  console.log(id)
  const request = new XMLHttpRequest();
  const url = "/FTT-WEB-091/game?game-id=" + id
  request.open("GET", url, true);
  request.send();
  request.onload = function () {
    console.log(this.responseText)
    window.localStorage.setItem('localGame', this.responseText);
    window.location.href = "update-game.html";
  }
  

}

function listaJogos(){
	const request = new XMLHttpRequest();
	request.open("GET", "/FTT-WEB-091/game");
	
	request.onload = function () {
  const response = JSON.parse(this.responseText);
  console.log(JSON.parse(this.responseText));

  const table = document.querySelector(".table-game");
  for (let line of response) {
    var row = document.createElement("tr");
    var id = document.createElement("td");
    id.innerHTML = line.id;
    row.appendChild(id);
    var name = document.createElement("td");
    name.innerHTML = line.name;
    row.appendChild(name);
    
    var producer = document.createElement("td");
    producer.innerHTML = line.producer;
    row.appendChild(producer);
    var genre = document.createElement("td");
    genre.innerHTML = line.genre;
    row.appendChild(genre);
    var releaseDate = document.createElement("td");
    releaseDate.innerHTML = line.releaseDate;
    row.appendChild(releaseDate);
    var action = document.createElement("td");
    var d = document.createElement("button")
    d.innerHTML = "Apagar"
    d.classList.add("btn-danger");
    d.classList.add("btn");
    d.addEventListener("click", function () {
      console.log("delete")
      deleteGame(line.id)
    })
    action.appendChild(d)
    
    var u = document.createElement("button")
    u.innerHTML = "Editar"
    u.classList.add("btn-warning");
    u.classList.add("btn");
    u.addEventListener("click", function () {
      console.log("update")
      updateGame(line.id)
    })
    action.appendChild(u)

    var t = document.createElement("button")
    t.innerHTML = "Trailer"
    t.classList.add("btn-info");
    t.classList.add("btn");
    console.log(line.name)
    t.addEventListener("click", function(){
      console.log("trailer")
      trailer(line.id,line.name)
    })
    action.appendChild(t)

    row.appendChild(action)
    table.appendChild(row);
	  }
	  console.log(table)
	};
	
	request.onerror = function () {
	  console.log("erro ao executar a requisição");
	};
	
	request.send();
}

function listaFilmes(){
	
	const requestMovie = new XMLHttpRequest();
	requestMovie.open("GET", "/FTT-WEB-091/movie");
	
	requestMovie.onload = function () {
	  const response = JSON.parse(this.responseText);
	  console.log(JSON.parse(this.responseText));
	
	  const table = document.querySelector(".table-movie");
	  for (let line of response) {
	    var row = document.createElement("tr");
	    var id = document.createElement("td");
	    id.innerHTML = line.id;
	    row.appendChild(id);
	    var name = document.createElement("td");
	    name.innerHTML = line.name;
	    row.appendChild(name);
	    var producer = document.createElement("td");
	    producer.innerHTML = line.producer;
	    row.appendChild(producer);
	    var genre = document.createElement("td");
	    genre.innerHTML = line.genre;
	    row.appendChild(genre);
	    var releaseDate = document.createElement("td");
	    releaseDate.innerHTML = line.releaseDate;
	    row.appendChild(releaseDate);
	    var action = document.createElement("td");
	    var d = document.createElement("button")
	    d.innerHTML = "Apagar"
	    d.classList.add("btn-danger");
	    d.classList.add("btn");
	    d.addEventListener("click", function () {
	      console.log("delete")
	      deleteMovie(line.id)
	    })
	    action.appendChild(d)
	
	    var u = document.createElement("button")
	    u.innerHTML = "Editar"
	    u.classList.add("btn-warning");
	    u.classList.add("btn");
	    u.addEventListener("click", function () {
	      console.log("update")
	      updateMovie(line.id)
	    })
	    action.appendChild(u)
	
	        var t = document.createElement("button")
	    t.innerHTML = "Trailer"
	    t.classList.add("btn-info");
	    t.classList.add("btn");
	    console.log(line.name)
	    t.addEventListener("click", function(){
	      console.log("trailer")
	      trailer(line.id,line.name)
	    })
	    action.appendChild(t)
	
	    row.appendChild(action)
	
	    table.appendChild(row);
	  }
	  console.log(table)
	};
	
	requestMovie.onerror = function () {
	  console.log("erro ao executar a requisição");
	};
	
	requestMovie.send();

}

function filtra() {

    	  var input, filter, ul, li, a, i, txtValue;
    	  input = document.getElementById('myInput');
    	  filter = input.value.toUpperCase();
    	  ul = document.getElementById("myUL");
    	  li = ul.getElementsByTagName('tr');


    	  for (i = 0; i < li.length; i++) {
    	    a = li[i].getElementsByTagName("td")[1];
    	    txtValue = a.textContent || a.innerText;
    	    if (txtValue.toUpperCase().indexOf(filter) > -1) {
    	      li[i].style.display = "";
    	    } else {
    	      li[i].style.display = "none";
    	    }
    	  }
    	}