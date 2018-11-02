const resturantCache = 'v1'; //name of cache for this project

var cacheLinks = [//list all files and images want to cache(save on browser)
    '/',
    '../index.html',
    '../restaurant.html',
    '../css/styles.css',
    'restaurant_info.js',
    'registering-serviceworker.js',
    'main.js',
    'dbhelper.js',
    '../img/1.jpg',
    '../img/2.jpg',
    '../img/3.jpg',
    '../img/4.jpg',
    '../img/5.jpg',
    '../img/6.jpg',
    '../img/7.jpg',
    '../img/8.jpg',
    '../img/9.jpg',
    '../img/10.jpg'
];

//fires when browser set up a new service worker for the first time.
self.addEventListener('install', function(cacheEvent){
    cacheEvent.waitUntil(//if and when the promises resolves, the browser knows the install is complete.
        // waits until the promise is complete and get rid of the service work.

        caches.open(resturantCache).then(function(cache){//creates or opens a cache and if successful returns promise
            //if ther was a cache open with that name before, it creates one and returns it
            console.log(`Serviceworker caches files: ${cache}`);
            return cache.addAll(cacheLinks); //takes an array of urls, fetched them, and puts the request-response pairs into cache.
        }).catch(function(cacheError){
            console.log(cacheError);
        })
    );
})




