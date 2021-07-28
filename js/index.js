import search from "./search.js";
import requestWether from "./fetch.js"

const d = document;


d.addEventListener("click", async e => {

    const letterUppercase = async function(site){
        site=site[0].toUpperCase() + site.slice(1);
        console.log("En mayus",site)
        return site
    }
    try {
        if (e.target.matches("form #btn-search >*")||e.target.matches("form #btn-search")) {
            console.log("has pulsado el botón:",e.target)
            e.preventDefault()
            let place = d.querySelector("form").search.value;
            d.querySelector("form").search.value = ""
            console.log(place)
            if (place === "") {
                alert("Input a city in the search")
                return
            }

            place=await letterUppercase(place)

            const code = await search(place);

            if(code===""){
                const msg="Introduce correctamente el nombre de la localidad";
                d.querySelector(".actual-information").innerHTML=`<p class="error">${msg}</p>`;
                d.querySelector(".wrap-content-next").innerHTML="";
                return
            } else{
                await requestWether(code)
            }
            
           


        }
    } catch (err) {
        console.log(err)
    }
})