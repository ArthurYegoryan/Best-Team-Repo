
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

const myFetch = function(data){
    let imgData = data[0].flags.svg
    let imgData1 = data[0].capital.toString()
    let imgData2 = data[0].coatOfArms.svg
    let imgData3 = data[0].name.official
    let imgData4 = data[0].population
    let div = '';
    div += `
    <div id="const">
    <h2 id="title">${imgData3}</h2><br>
    <div id="img">
    <div><img src="${imgData}"id = "img1"></div><br>
    <div><img src="${imgData2}"id = "img2"></div><br>
    </div>
    <div id="capital">Capital:${imgData1}</div><br>
    
    <div id="pop">Population${imgData4}</div>
    </div>
    `
    countryDet.id = "countryDetails"
    countryDet.innerHTML = div
    document.body.appendChild(countryDet)
  }

  
searchInput.addEventListener("input",()=>{
    let searchRes = searchInput.value
    if(searchRes.length >= 3){

    
    fetch(`https://restcountries.com/v3.1/name/${searchRes}`)
    .then(res => res.json())
    .then(data =>{
        let ul = data[0].name.common
        let div = '';
        div += `<ul>${ul} </ul>`
        countryUl.innerHTML = div

        countryUl.addEventListener("click",()=>{
            fetch(`https://restcountries.com/v3.1/name/${searchRes}`).
            then(res => res.json()).
            then(data =>{
                myFetch(data)
        
        })
        })
    })
}else{
    let div = ''
    countryUl.innerHTML = div
}
    
  
})
