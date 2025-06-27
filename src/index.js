let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const form=document.querySelector(".add-toy-form");

  fetch("http://localhost:3000/toys")
  .then(response =>response.json())
  .then(toys =>{
    toys.forEach(toy =>renderToyCard(toy));
  });
  form.addEventListener("submit", function(event){
    event.preventDefault();

    const name=event.target.name.value;
    const image=event.target.image.value;

    fetch("http://localhost:3000/toys", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })
    .then(response => json())
    .then(newToy => {
      renderToyCard(newToy);
      toyForm.reset();
    });
  });

});
function renderToyCard(toy){
  const toyCollection = document.getElementById("toy-collection");

  const card = document.createElement("div");
  card.className="card"

   card.innerHTML=`
    <h2> ${toy.name}</h2>
    <img class="toy-avatar" src="${toy.image}"/>
    <p> ${toy.likes} Likes </p>
    <button class="like-btn" id="${toy-id}"> Like </button>

    `;
    toyCollection.appendChild(card);

   
    

    const likeBtn=card.querySelector(".like-btn");
    likeBtn.addEventListener("click", function(){
      const newLikes = toy.likes + 1;

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      
        },
        body: JSON.stringify({
          likes:newLikes
        })
      })
      .then(response => response.json())
      .then(updatedToy => {
        toy.likes = updatedToy.likes;
        const likeText = card.querySelector("p");
        likeText.textContent = `${updatedToy.likes} Likes`
      });
    });

}