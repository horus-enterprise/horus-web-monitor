const api = 'https://horus-dashboard.azurewebsites.net/webmon/cadastrarHistorico';
// const api = 'http://localhost:3000/webmon/cadastrarHistorico';

const sessionFile = chrome.runtime.getURL('./data.json');

async function start(historyItem) {
    let url = new URL(historyItem.url).origin;

    let time = new Date(historyItem.lastVisitTime);
    let dateFormatted = time.toISOString();
    
    let session = await getSessionData();

    if (Object.keys(session).length === 0 || !session.idFuncionario || !session.idMaquina) {
        console.log('Erro: Não foi possível detectar um usuário logado!');
        return;
    }

    const data = {
        idFuncionario: session.idFuncionario,
        idMaquina: session.idMaquina,
        url: url,
        dataHora: dateFormatted
    }

    fetch(api, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => {
            console.log('Status: ' + res.status);
        })
        .catch(err => {
            console.log('Erro: ' + err.message);
        });
}

async function getSessionData() {
    try {
        const req = await fetch(sessionFile);
        const result = await req.json();
        return result;
    } catch (e) {
        console.log(e.message);
    }
}

chrome.history.onVisited.addListener(start);
