const CACHE_NAME = 'cache-001';
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
				return cache.addAll(
					urlsToCache.map(
						url => new Request(
							url,{ credentials: 'same-origin' }
						)
					)
				)
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