if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceworker.js').then(function(theRegister){
        console.log('Service worker was registered.');
    }).catch(function(registerError){
        console.log(`No service worker registered: Error discription ${registerError}.`);
    });
}