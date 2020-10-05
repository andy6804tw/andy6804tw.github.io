function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // 輸出成 json
}

function predictType(result){
    if(result==0)
        return 'setosa';
    else if(result==1)
        return 'versicolor';
    else
        return 'virginica';
}


function submit(){
    const sepalLengthCm=document.getElementById('sepalLengthCm').value;
    const sepalWidthCm=document.getElementById('sepalWidthCm').value;
    const petalLengthCm=document.getElementById('petalLengthCm').value;
    const petalWidthCm=document.getElementById('petalWidthCm').value;
    const data = {
        sepalLengthCm,
        sepalWidthCm,
        petalLengthCm,
        petalWidthCm
    }
    postData('https://flask-api-example-with-ml-mode.herokuapp.com/predict', data)
    .then(data => {
        const result=data.result
        console.log(result, predictType(result));
        document.getElementById('resultText').innerHTML=predictType(result);
    })
    .catch(error => console.error(error))
}


