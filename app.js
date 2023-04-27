
const apikey = 'e7704bc895b4a8d2dfd4a29d404285b6'
// '69f9afe03f52ef5c83887fc86dd79d99'
// '32655874a2c77ae4a04bb96236a642d2f'
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `
https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}
`;


async function getWeatherByLocation(city){
    const resp = await fetch(url(city))
    origin:'cors'
    const respData = await resp.json()
    // console.log(respData,KtoC(respData.main.temp))
    addWeatherToPage(respData)
}

getWeatherByLocation('Denizli');


function addWeatherToPage(data){ 
    const temp = KtoC(data.main.temp)

    const weather = document.createElement('div')
    weather.classList.add('weather')

    weather.innerHTML =`
    
    <h2>${(Math.round(temp*100)/100).toFixed(2)}°C</h2>
    <small> In ${search.value.toUpperCase()}</small>
    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
    <small>${data.weather[0].main}</small>
`
//clean up  
main.innerHTML='';

main.appendChild(weather);
};

function KtoC(K){ 
    return K - 273.15
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city = search.value
    
    if (city) {
        getWeatherByLocation(city)
    }
    

    
});

