const information = document.getElementById('info');
console.log('infor');

information.innerText =  `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), Electron (v${versions.electron()}) :D`;

const func = async () => {
    const response = await window.versions.ping();
    console.log(response);
}

func();