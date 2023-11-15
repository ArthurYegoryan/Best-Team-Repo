
let country = fetch( 'https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data =>{
    let select = "";
    console.log(data)
    data.map((countryName)=>{
        select += `
            <option>${countryName["name"]["common"]}</option>
            `
    });
    document.getElementById("country").innerHTML = select
    
} )



