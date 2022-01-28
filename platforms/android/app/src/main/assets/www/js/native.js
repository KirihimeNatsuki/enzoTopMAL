window.addEventListener("batterystatus", onBatteryStatus, false);

function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
    if(status.isPlugged) {
        document.getElementById("full").classList.remove("hidden");
    } else {
        document.getElementById("full").classList.add("hidden");
    }
}

window.addEventListener("batterylow", onBatteryLow, false);

function onBatteryLow(status) {
    alert("Niveau de batterie faible " + status.level + "%");
    document.getElementById("half").classList.remove("hidden");
    document.getElementById("low").classList.add("hidden");
    document.getElementById("full").classList.add("hidden");
}

window.addEventListener("batterycritical", onBatteryCritical, false);

function onBatteryCritical(status) {
    alert("Niveau de batterie critique " + status.level + "%\nRecharge vite!");
    document.getElementById("low").classList.remove("hidden");
    document.getElementById("full").classList.add("hidden");
    document.getElementById("half").classList.add("hidden");
}