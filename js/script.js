
let selectElement = document.getElementById("country");
let searchInput = document.getElementById("searchInput");
let countryUl = document.getElementById("countriesList")
let countryDet = document.createElement("div")

let country = fetch( 'https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data =>{
    data.map((countryName)=>{
        let opt = document.createElement("option");
        opt.value = countryName["name"]["common"];
        opt.text = countryName["name"]["common"];
        selectElement.appendChild(opt)
        
        
    })
    console.log(data)
})
.catch(error => console.error("Error fetching data",error))

selectElement.addEventListener("change",()=>{
        fetch(`https://restcountries.com/v3.1/name/${selectElement.value}`).
        then(res => res.json()).
        then(data =>{
            console.log(data)
            let imgData = data[0].flags.svg
            let div = '';
            div += `<img src="${imgData}" alt="">`
            countryDet.innerHTML = div
        })
})


