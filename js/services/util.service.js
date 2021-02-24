export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    formatAsCurrency,
    testImage,
    matchYoutubeUrl,
};

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
}

function makeId(length = 5) {
    var txt = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function formatAsCurrency(value, currency) {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    });
}

function testImage(url) {
    return new Promise(function (resolve, reject) {
        var timeout = 3000;
        var timer,
            img = new Image();
        img.onerror = img.onabort = function () {
            clearTimeout(timer);
            reject('error');
        };
        img.onload = function () {
            clearTimeout(timer);
            resolve(url);
        };
        timer = setTimeout(function () {
            // reset .src to invalid URL so it stops previous
            // loading, but doesn't trigger new load
            img.src = '//!!!!/test.jpg';
            reject('timeout');
        }, timeout);
        img.src = url;
    });
}

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
        return url.match(p)[1];
    }
    return false;
}
