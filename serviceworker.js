const resturantCache = 'v9'; //name of cache for this project

var cacheLinks = [//list all files and images want to cache(save on browser)
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/restaurant_info.js',
    '/js/registering-serviceworker.js',
    '/js/main.js',
    '/js/dbhelper.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/data/restaurants.json'
];

// fires when browser set up a new service worker for the first time.
self.addEventListener('install', function(cacheEvent){
    cacheEvent.waitUntil(//if and when the promises resolves, the browser knows the install is complete.
        // waits until the promise is complete and get rid of the service work.

        caches.open(resturantCache).then(function(cacheObject){//creates or opens a cache and if successful returns promise
            //if there was a cache open with that name before, it creates one and returns it
            console.log(`Serviceworker caches files (saves them): ${cacheObject}`);

            return cache.addAll(cacheLinks); //takes an array of urls, fetched them, and puts the request-response pairs into cache(storage).

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
        //it sort of creates an object container of all caches that been created and is stored for the app on the browser
        caches.keys().then(function(allResturantCaches){
                //works similar to  a foreach, allResturantCaches is like a basket AND eachRestcache is an item in the basket
            return Promise.all(
                allResturantCaches.map(function(eachRestcache){
                    if (eachRestcache!= resturantCache){
                        //check if each cache item is the same/equal to the value of the cache variable given to resturantCache
                        console.log('Service worker deleting old cache');
                        return caches.delete(eachRestcache);
                    }
                })
            )
        })
    );
});

//Fetch event enables us to show cached files if we're offline
self.addEventListener('fetch', function(cacheEvent){
    console.log("Service worker fetching.");
    
    //cacheEvent.respondWith tells the browser that we’re going to handle this request
    //takes a response object or a promise that resolves with a response.
    cacheEvent.respondWith(

        //Fetch let’s you make network requests and let’s you read the response.
        fetch(cacheEvent.request).catch(function(){
            //tries to find a match in any cache, caches.match used to get out the cache
            //function that will load the file with the .match method
            caches.match(cacheEvent.request)
        })
    )
})

/*
Note: to self

The service worker is located at the root file path is because it can only control files that are in the same folder as itself, or that folders sub-folders. So if you put it in the /js folder it won't be able to cache anything that isn't in that folder.
*/