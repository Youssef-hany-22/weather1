// html selection


// variable
// function
async function getApi(location){
let response = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=fc8994d18aa44bcd916161303240702&q=${location}&days=3&aqi=no&alerts=no`)
const data = await response.json()
console.log(data)
display(data)
}
getApi("cairo")
let weekday=" ";
let month=" ";
let dayNum=" ";
function getdate( day){
    
 const date = new Date(day )
 console.log(date);
 weekday = date.toLocaleDateString("en-us", { weekday: "long" })
 month = date.toLocaleDateString("en-us", { month: "long" })
 dayNum= date.getDate();
 return { weekday, month, dayNum }
 
}



function success (postion){
    // console.log(postion)
    // console.log(postion.coords.latitude)
    // console.log(postion.coords.longitude)
   const location=`${postion.coords.latitude},${postion.coords.longitude}`
   getApi(location)
}

 navigator.geolocation.getCurrentPosition(success)

 function display(data){
    let days=data.forecast.forecastday;
  console.log(days);
let [currentday,nextday,thirdday]=days;

//console.log(currentday);


// console.log(data.location.region);
// console.log(data.current.temp_c);
// console.log(data.current.temp_c);


    let box1 =""
    let box2 =""
    let box3 =""
    box1+=`
    <div class="header d-flex justify-content-between align-items-center">
                  <h2 class="fs-1">${getdate(currentday.date).weekday}</h2>
                  <p>${dayNum}${month}</p>
                </div>
                <div>
                  <h3 class="ms-3">${data.location.region}</h3>
                  <div class="degree d-flex justify-content-around">
                    <h1 class="num">${data.current.temp_c}°c</h1>
                    <img src="https:${data.current.condition.icon}" alt="">
                  </div>
                  <p class="ms-4 text-primary">${data.current.condition.text}</p>  
                  <div class="d-flex justify-content-around w-50">
                    <span><img src="images/icon-umberella.png" alt=""> 20%</span>
                    <span><img src="images/icon-wind.png" alt="">18km/h</span>
                    <span><img src="images/icon-compass.png" alt="">East</span>
                  </div>              
                
                 
                  
    
    
    `

    box2+=`
    
                 <h2>  ${getdate(nextday.date).weekday}  </h2>
                <div class="card-body">
                  <img src="https:${days[1].day.condition.icon}" alt="" class="w-25">
                  <h3>${ days[1].day.maxtemp_c}°C</h3>
                  <p>${ days[1].day.mintemp_c}°c</p>
                  <span class="text-primary">${days[1].day.condition.text}</span>
    
    
    
    `
    box3+=`
    
                 <h2>  ${getdate(thirdday.date).weekday}  </h2>
                <div class="card-body">
                  <img src="https:${days[2].day.condition.icon}" alt="" class="w-25">
                  <h3>${ days[2].day.maxtemp_c}°C</h3>
                  <p>${ days[2].day.mintemp_c}°c</p>
                  <span class="text-primary">${days[1].day.condition.text}</span>
    
    
    
    `

    document.querySelector("#main").innerHTML=box1;
    document.querySelector("#next").innerHTML=box2;
    document.querySelector("#third").innerHTML=box3;
 }

document.addEventListener("keyup",function(eventenfo){
let location =eventenfo.target.value


getApi(location)
})