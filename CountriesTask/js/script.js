
let selectElement = document.getElementById("country");
let searchInput = document.getElementById("searchInput");
let countryUl = document.getElementById("countriesList")
let countryDet = document.createElement("div")

let country = fetch( 'https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data =>{
    data.map((countryName)=>{
        let opt = document.createElement("option");
        opt.id = "opt1"
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
            myFetch(data)
        })
})



  
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
const myFetch = function(data){
    let imgData = data[0].flags.svg
    let imgData1 = data[0].capital.toString()
    let imgData2 = data[0].coatOfArms.svg
    let imgData3 = data[0].name.official
    let imgData4 = data[0].population
    let imgData5 = "";
    let imgData6 = data[0].area
    let imgData7 = ""
    let imgData8 = data[0].continents[0]
    for(key in data[0].languages){
        imgData5 += data[0].languages[key] + " "
    }
    console.log(data)
    if(data[0].borders){
        data[0].borders.map((val)=>{
        imgData7 += val + " "
    })
    }else{
        imgData7 += "None"
    }
    
    let div = '';
    div += `
    <div id="const">
    <h2 id="title">${imgData3}</h2><br>
    <div id="img">
    <div><img src="${imgData}"id = "img1"></div><br>
    <div><img src="${imgData2}" alt = "Coat of Arm" id = "img2"></div><br>
    </div>
    <div id="capital">Capital: ${imgData1}</div><br>
    
    <div id="pop">Population: ${imgData4}</div><br>
    <div id="language">Language(s): ${imgData5}</div><br>
    <div id="area">Area: ${imgData6}</div><br>
    <div id="border">Borders: ${imgData7}</div><br>
    <div id="continent">Continent: ${imgData8}</div>
    </div>
    `
    countryDet.id = "countryDetails"
    countryDet.innerHTML = div
    document.body.appendChild(countryDet)
  }