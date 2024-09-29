const error = document.getElementById("error");
async function wetherDataFetch() {
    try {
        let cityName = document.getElementById("EnterCityName").value;
        let response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=63c9bdb635dd496fbd085858242209&q= ${cityName}`
        );
        const data = await response.json();
        console.log(data);
        if (data.error) {
            document.querySelectorAll(".data").forEach((element) => {
                element.style.display = "none";
            });
            error.style.display = "block";
        } else {
            error.style.display = "none";
        }

        document.getElementById("cityName").innerText =
            data.location.name +
            ", " +
            data.location.region +
            ", " +
            data.location.country;
        document.getElementById("temp").innerText = data.current.temp_c + " °C";
        document.getElementById("picture").src = data.current.condition.icon;
        document.getElementById("text").innerText = data.current.condition.text;
        document.getElementById("feelslike_c").innerText =
            "FeelsLiek " + data.current.feelslike_c + "  °C  ";



        updateClock();
        // setInterval(updateClock, 1000);
    } catch (error) {
        console.error(error);
    }
}



function updateClock() {
    const now = new Date();

    // let hours = now.getHours();
    // const meridiem = hours >= 12 ? `PM` : `AM`;
    // hours = hours % 12 || 12;
    // hours = hours.toString().padStart(2, 0);
    // const min = now.getMinutes().toString().padStart(2, 0);
    // const sec = now.getSeconds().toString().padStart(2, 0);
    // const timeString = `${hours}:${min}:${sec}:  ${meridiem}`;
    //  document.getElementById("clock").textContent = timeString;

    let day = now.getDate().toString().padStart(2, 0);
    let month = (now.getMonth() + 1).toString().padStart(2, 0);
    let year = now.getFullYear().toString().padStart(2, 0);
    document.getElementById("date").textContent = `${day}/${month}/${year}`;
    // console.log(now);
}

let cityName = document.getElementById("EnterCityName");
cityName.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        wetherDataFetch();
    }
});