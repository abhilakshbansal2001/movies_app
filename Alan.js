// const card_div = document.querySelector(".card-div");
// const search = document.getElementById('search');
// const filter = document.getElementById('filter');
// const btn = document.querySelector('.btn');
// const search_bar = document.querySelector(".search-bar");
// const API_KEY = "355652c9";
    
    var alanBtnInstance = alanBtn({
		key: "f7732a0c153a6e6707edcd80d26b62952e956eca572e1d8b807a3e2338fdd0dc/stage",
		onCommand: function ({command , data}) {
			if (command === "searchMovies") {
				displayCard(data)
            }
            else if(command == "particular"){
                if(data)
                changePageLayoutForSecond(data)
                else
                    alert("Something went wrong")
            }
            else if(command == "backing"){
                goBack();
            }
		},
		rootEl: document.getElementById("alan-btn"),
    });
    

    function displayCard(data){

          

           
       
      if(data && data.Response == "True"){
        search.value = '';
        card_div.innerHTML = '';

        card_div.classList.add("justify-content-around");
        data.Search.forEach(el => {
            const id = el.imdbID;
            card_div.innerHTML += `
            <div class="col-md-4 card" id=${id} onclick="moreInfo(${id})">
                        <div class="image-card">
                            <img src=${el.Poster} alt="">
                        </div>
                        <div class="information-card">
                            <h3>${el.Title}</h3> <br>
                            <ul>
                                <li><h4>Type</h4> <p>${el.Type}</p></li><br>
                                <li><h4>Year</h4> <p>${el.Year}</p></li><br>
                            </ul>
                        </div>
            </div>
            `;
           });
      }
      else {
        alert("Please try again");

      }
        
    
    }