const resturantCache = 'v4'; //name of cache for this project

var cacheLinks = [//list all files and images want to cache(save on browser)
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    'restaurant_info.js',
    'registering-serviceworker.js',
    'main.js',
    'dbhelper.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// fires when browser set up a new service worker for the first time.
self.addEventListener('install', function(cacheEvent){
    cacheEvent.waitUntil(//if and when the promises resolves, the browser knows the install is complete.
        // waits until the promise is complete and get rid of the service work.

        caches.open(resturantCache).then(function(cacheObject){//creates or opens a cache and if successful returns promise
            //if there was a cache open with that name before, it creates one and returns it
            console.log(`Serviceworker caches files (saves them): ${cacheObject}`);

            return cache.addAll(cacheLinks); //takes an array of urls, fetched them, and puts the request-response pairs into cache.

        }).
        catch(function(cacheError){
            console.log(cacheError);
        })
    );
});

// service worker is in control, delete old caches
self.addEventListener('activate', function(cacheEvent){
    console.log('The service worker is activated');
    cacheEvent.waitUntil(// until promise is fullfill and gets rid of service worker

        //using caches.keys- get the names of all the current caches 
        //it sort of creates an object container of all caches that been created and is sorted for the app on the browser
        caches.keys().then(function(allResturantCaches){
                //works similar to  a foreach, allResturantCaches is like a basket AND eachRestcache is items in the basket
            return Promise.all(
                allResturantCaches.map(function(eachRestcache){
                    if (eachRestcache!= resturantCache){
                        //check it each cache item is the same/equal to the value of the cache variable given to resturantCache
                        console.log('Service worker deleting old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener('fetch', function(cacheEvent){
    console.log("Service worker fetching.");
    cacheEvent.respondWith(
        fetch(cacheEvent.request).catch(function(){
            catches.match(cacheEvent.request)
        })
    )
})
