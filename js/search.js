const d = document;

export default async function search(place) {

    const searchPlace = async function (json) {
        console.log(json);
        let i = 0;
        let flag = 0;
        let code = "";

        while (i < json.length && flag === 0) {
            //console.log(json[i].nombre)
            if (json[i].nombre === place) {
                flag = 1;
                code = json[i].municipio_id;
            } else {
                i++
            }
        }
        console.log("El code es:", code);

        return code
    }

    try{
        let res = await fetch("asset/comunidades.json");
        let json = await res.json();
        const code= await searchPlace(json);
        return code
    }catch{
        console.log(err)
    }



}