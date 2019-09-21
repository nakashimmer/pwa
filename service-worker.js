self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
	msg.innerHTML="インストールしました";
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
	msg.innerHTML="アクティベートしました";
});

// 現状では、この処理を書かないとService Workerが有効と判定されないようです
self.addEventListener('fetch', function(event) {});