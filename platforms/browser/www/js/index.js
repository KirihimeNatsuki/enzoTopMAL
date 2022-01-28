// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    document.getElementById("addItem").onclick = addNewItemToTop;
    document.getElementById("newListe").onclick = checkTops;
    document.getElementById("cancel_top").onclick = effacerChamps;
}

