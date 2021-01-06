const card_div = document.querySelector(".card-div");
const search = document.getElementById('search');
const filter = document.getElementById('filter');
const btn = document.querySelector('.btn');
const search_bar = document.querySelector(".search-bar");
const API_KEY = "355652c9";
const display_movies = ["man", "avengers"]

function displayCard(data){
    console.log(data);
  if(data && data.Response == "True"){
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
    card_div.classList.remove("justify-content-around");
      card_div.classList.add("align-items-center");
      card_div.classList.add("justify-content-center");
      card_div.innerHTML = `
        <h1 class="text-center">Error 404</h1>
      
      `;
  }
    

}
async function fetch_card(movie){
    const res = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`)
    const data = await res.json();
    
    displayCard(data);
}
async function fetch_card_region(region){
    const res = await fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    const data = await res.json();
    
    displayCard(data);
}

display_movies.map((movie) => {
    fetch_card(movie);
})


btn.addEventListener('click',(e) => {
    e.preventDefault();
    const countryValue = search.value;
   if(countryValue){
    search.value = '';
    card_div.innerHTML = '';
    fetch_card(countryValue);
    console.log(countryValue);
    
   }
   else {
   
       alert("Please Insert some values");
   }
       
})

 function moreInfo(data){
   
    i = data.id;
    
    console.log(i);
    moreInformationPage(i)
   
}

async function moreInformationPage(id){
    // name = name.replace(/_/g," ");
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
    const data = await res.json();
    changePageLayoutForSecond({...data});

}
function changePageLayoutForSecond(detail){
  console.log(detail);
     search_bar.innerHTML= `<div class="col-12" onclick="goBack()">
     <div class="myButton"><i class="fas fa-arrow-left"></i> Back</div>
   </div>`;


   card_div.innerHTML = `
   <div class="col-md-6 flag-div">
   <img src="${detail.Poster}" class="flag" alt="">
 </div>
 <div class="col-md-6">
   <h1 class="mb-4 country-name">${detail.Title}</h1>
   <div class="row justify-content-between">
     <div class="col-5 mb-3">
       <ul class="second-page-list">
         <li><h3>Rating:</h3> <p>${detail.imdbRating}</p> </li>
         <li><h3>Released:</h3> <p>${detail.Released}</p> </li>
         <li><h3>Genre: </h3> <p>${detail.Genre}</p> </li>
         <li><h3>Production:</h3> <p>${detail.Production}</p> </li>
         <li><h3>Duration:</h3> <p>${detail.Runtime}</p> </li>
       </ul>
     </div>
     <div class="col-5">
     <ul class="second-page-list">
         
         <li><h3>Collection:</h3> <p class="currencies">` + detail.BoxOffice + `</p> </li>
         <li><h3>Cast:</h3> <p class="languages">` + detail.Actors.split(",").join(" , ") + `</p> </li>
    
     </ul>
     </div>
     <div class="col-12 border-div">
       <h3>Other Ratings:</h3>
       <ul class="second-page-list">
       `+ detail.Ratings.map(el => `<li>${el.Source} - ${el.Value}</li>`).join("") +`
       </ul>
     </div>
   </div>
 </div>
   `;
  

}


function goBack(){
  console.log("clicked");
  window.location.reload();
}

// Event Listeners
// const cards = document.querySelectorAll(".col-md-3.card");
// cards.forEach(card => {
    // document.addEventListener("click",moreInformation)
// })${detail.borders.map(el => <span>el</span>.join(""))}


// filter.addEventListener("change",(e) => {
//     card_div.innerHTML = '';
//     // filter.options["Filter by Region"].remove();
//     var region = filter.options[filter.selectedIndex].text;
//     console.log(region);
    
//     fetch_card_region(region);

// })












{/* <ul class="second-page-list">
<li><h3>Top Level Domain: </h3> ${detail.topLevelDomain.map(el => <p>el</p>  ).join("")}</li>
<li><h3>Currencies:</h3> ${detail.currencies.map(el => <p> el </p> ).join("")}</li>
<li><h3>Languages:</h3> <p>${detail.languages.map(el => <p> el </p> ).join("")} </li>

</ul> */}