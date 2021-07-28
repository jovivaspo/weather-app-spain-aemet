import icons from "./icons.js";
const d=document;
const API_KEY="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb3ZpdmFzcG9AZ21haWwuY29tIiwianRpIjoiYTY2ZWM0N2MtOTY1Yy00ZWYxLTg5MmUtM2YwODRmNjQ0ZDFkIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2MjcxNDE3NTgsInVzZXJJZCI6ImE2NmVjNDdjLTk2NWMtNGVmMS04OTJlLTNmMDg0ZjY0NGQxZCIsInJvbGUiOiIifQ.e3QmolykFHTgoxyU0U7eRNzujtKQ2fU9Yc7GuOvz328";
const URL="https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/";

export default async function requestWether(code){

    const $template_today=d.querySelector("#today").content;
    const $fragment_today=d.createDocumentFragment();
    const $actualInformation=d.querySelector(".actual-information");
    const $wrap_next=d.querySelector(".wrap-content-next");


    const printDates= async function(datos){
        console.log(datos);

        $actualInformation.innerHTML="";

        $template_today.querySelector(".city").innerHTML=datos[0].nombre;
        $template_today.querySelector(".fecha").innerHTML=`Previsión para hoy: ${datos[0].prediccion.dia[0].fecha.slice(0,10)}`;
        $template_today.querySelector(".temperature").innerHTML=`Temperatura ${datos[0].prediccion.dia[0].temperatura.maxima}ºC / ${datos[0].prediccion.dia[0].temperatura.minima}ºC`;
        $template_today.querySelector(".humidity").innerHTML=`Humedad ${datos[0].prediccion.dia[0].humedadRelativa.maxima}% / ${datos[0].prediccion.dia[0].humedadRelativa.minima}%`;
        $template_today.querySelector(".wind").innerHTML=`Viento ${datos[0].prediccion.dia[0].uvMax? datos[0].prediccion.dia[0].uvMax :  datos[0].prediccion.dia[0].viento[0].velocidad}km/h`;

       let wether=datos[0].prediccion.dia[0].estadoCielo[6].descripcion? datos[0].prediccion.dia[0].estadoCielo[6].descripcion : "Sin datos"
       $template_today.querySelector(".wether").innerHTML=`<img src="${icons[wether]}" alt="${wether}">`;
       $template_today.querySelector(".wether-text").innerHTML=wether;


       let $clon=d.importNode($template_today,true);
       $fragment_today.appendChild($clon);
       $actualInformation.appendChild($fragment_today);

       let $template_next="";
       $wrap_next.innerHTML="";
       for(let i=1;i<=6;i++){
        let wether=datos[0].prediccion.dia[i].estadoCielo[0].descripcion? datos[0].prediccion.dia[i].estadoCielo[0].descripcion : "Sin datos"
           $template_next+=`<section class="day day-${i}>
            <p class="fecha">${datos[0].prediccion.dia[i].fecha.slice(0,10)}</p>
            <p class="wether"><img src="${icons[wether]}" alt="${wether}"></p>
            <p>${datos[0].prediccion.dia[i].temperatura.maxima}ºC / ${datos[0].prediccion.dia[i].temperatura.minima}ºC</p>
            <p>${datos[0].prediccion.dia[i].humedadRelativa.maxima}% / ${datos[0].prediccion.dia[i].humedadRelativa.minima}%</p>
            <p>${datos[0].prediccion.dia[i].uvMax? datos[0].prediccion.dia[i].uvMax :  datos[0].prediccion.dia[i].viento[0].velocidad}km/h</p>
           </section>`
       }
       $wrap_next.innerHTML=$template_next;

    }
    
    try{
        let res= await fetch(`${URL}${code}/?api_key=${API_KEY}`);
        let json= await res.json();
        res= await fetch(json.datos);
        let datos=await res.json()
        await printDates(datos);   
    }
    catch(err){
        console.log(err)
        const msg="Ha ocurrido un fallo en la solicitud";
        d.querySelector(".actual-information").innerHTML=`<p class="error">${msg}</p>`;

    }

}