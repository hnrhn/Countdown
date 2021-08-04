const template = '<div class="item"><div class="type {TYPE}"></div><div class="name">{NAME}</div><div class="time"><span class="number">{NUMBER}</span><br><span class="timeframe">{TIMEFRAME}</span></div></div>';
const typeLookup = {
    1: "task",
    2: "event"
}

/*
function loadItems() {
    return [
        {
            "name": "Test Item One",
            "start_date_time": "2021-06-25 20:00",
            "end_date_time": null,
            "repeats_every": null,
            "type": 2,
            "dismissed_date_time": null
        },
        {
            "name": "Test Item Two",
            "start_date_time": "2021-07-07 13:00",
            "end_date_time": null,
            "repeats_every": null,
            "type": 2,
            "dismissed_date_time": null
        }
    ];
}*/

async function loadItems() {
    let a = await fetch("http://localhost:5000/");
    return await a.json();
}

function calculateCountdown(item) {
    let futureDate = new Date(item.start_date_time);
    let diff = futureDate - Date.now();
    let sign = diff >= 0 ? "" : "- "
    diff = Math.abs(diff)

    let result = {};

    if (Math.abs(diff) > 86400000) {
        result.number = `${sign}${Math.floor(diff / 86400000)}`
        result.timeframe = "days"
    } else if (Math.abs(diff) > 3600000) {
        result.number = `${sign}${Math.floor(diff / 3600000)}`
        result.timeframe = "hours"
    } else {
        result.number = `${sign}${Math.floor(diff / 60000)}`
        result.timeframe = "minutes"
    }

    return result;
}

async function fillList() {
    let listContainer = document.getElementById("list");
    listContainer.innerHTML = null;
    for (let item of await loadItems()) {
        let countdownValue = calculateCountdown(item)
        listContainer.innerHTML += template.replace("{TYPE}", typeLookup[item.type]).replace("{NAME}", item.name).replace("{NUMBER}", countdownValue.number).replace("{TIMEFRAME}", countdownValue.timeframe);
    }
}

document.addEventListener("DOMContentLoaded", fillList);