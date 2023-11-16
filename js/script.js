
let selectElement = document.getElementById("country")
let country = fetch( 'https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data =>{
    console.log(data)
    data.map((countryName)=>{
        let opt = document.createElement("option");
        opt.value = countryName["name"]["common"];
        opt.text = countryName["name"]["common"];
        selectElement.appendChild(opt)

        
    })
})
.catch(error => console.error("Error fetching data",error))

selectElement.addEventListener("change",()=>{
    console.log(selectElement.value)
        fetch(`https://restcountries.com/v3.1/name/${selectElement.value}`).
        then(res => res.json()).
        then(data =>{
            let imgData = data[0].flags.svg
            let div = '';
            console.log(data[0].flags.svg)
            div += `<img src="${imgData}" alt="">`
            document.getElementById("image").innerHTML = div
        })
})