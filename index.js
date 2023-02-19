const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl=document.getElementById("gallery");

async function fetchImage(){
  const inputValue=document.getElementById("input").value;
  if (inputValue > 10 || inputValue <1){
    errorMessageEl.style.display="block";
    errorMessageEl.innerText="O número de fotos deveria estar entre 1 e 10."
    return; 
  }
  imgs="";
  try{
    btnEl.style.display="none";
    const loading = `<img src="spinner.svg" />`
    galleryEl.innerHTML = loading;
    await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()*1000)}&client_id=YmEDi5j82PLxXmhYUrTygbU49EzJ5yqoY5LrjrJUr4s`).then(
      (res)=>res.json().then((data)=>{if(data){
        data.forEach((pic)=>{
          imgs += `
          <img src=${pic.urls.small} alt="img"/>
          `;
          galleryEl.style.display="block";
          galleryEl.innerHTML=imgs;
          btnEl.style.display="block";
          errorMessageEl.style.display="none";
          })
        }
      })
    );
  }catch{
    errorMessageEl.style.display="block";
    errorMessageEl.innerHTML="Um erro ocorreu, tente novamente mais tarde!";
    btnEl.style.display="block";
  }
}

btnEl.addEventListener("click", fetchImage);
