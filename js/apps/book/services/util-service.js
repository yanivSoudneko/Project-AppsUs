export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    makeAxiosRequest,
    debounce
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeAxiosRequest(url) {
    return axios
        .get(url)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            console.log({ 'makeAxiosRequest Error': error });
        });
}

function debounce(func, wait) {
    let timeout;

    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}