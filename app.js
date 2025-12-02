//console.log("hej");
//deklarerar en asynkron funktion som heter fetchKeys
async function fetchKeys () {
  let resp = await fetch(
    "https://4a610o1px9.execute-api.eu-north-1.amazonaws.com/key"
  );
}
//anropar funktionen fetchKeys och loggar resultatet till konsolen
fetchKeys();
console.log(fetchKeys());

let resp = await fetch('https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/bodies', {
    method: 'GET',
    headers: {'x-zocom': '<solaris-zaCmZA74PLKCrD8Y>'}
})
