const CACHE_NAME = 'cache-v1';
const urlsToCache = [
		'/',
    './apple-touch-icon.png',
    './canvas.js',
    './html5-192.png',
		'./html5-256.png',
		'./index.html',
		'./service-worker.js',
		'./manifest.json'
];

// インストール処理
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function (cache) {
				return cache.addAll(urlsToCache);
			})
	);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function (response) {
				return response ? response : fetch(event.request);
			})
	);
});