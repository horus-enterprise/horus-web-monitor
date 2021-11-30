function printUrls(historyItem) {
    let url = historyItem.url;
    
    let time = new Date(historyItem.lastVisitTime);
    
    let hour = time.toLocaleTimeString('pt-BR');

    let data = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${hour}`;

    alert(`${url} \n==============\n ${data}`);
}

chrome.history.onVisited.addListener(printUrls);

// const url = chrome.runtime.getURL('./data.json');
// fetch(url)
//     .then((response) => response.json())
//     .then((json) => Object.keys(json).forEach((item) => alert(`${item}: ${json[item]}`)));