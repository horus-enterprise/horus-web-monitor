function printUrls(historyItems) {
  for (var i = 0; i < historyItems.length; ++i) {
    let url = historyItems[i].url;
    
    let time = new Date(historyItems[i].lastVisitTime);
    
    let data = time.toLocaleDateString('pt-BR');
    
    let hour = time.toLocaleTimeString('pt-BR');

    let mysql = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`;

    alert(`${url} \n---\n ${mysql} ${hour}`);
  }
}

chrome.history.search({ text: '', startTime: 0, maxResults: 999999 }, printUrls);