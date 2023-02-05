/*Wait for all link previews to be fetched, then return previews for each link in database*/
function getPreviews(entries) {
    const links = entries.map(entry => entry.link);
    const promises = links.map(link => getPreview(link));
    return Promise.all(promises);
}

/*For each link, get preview data from Peekalink API*/
function getPreview(link) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest(); 
        xhr.open('POST', 'https://api.peekalink.io/');
        xhr.setRequestHeader('X-API-Key', 'bb9188bd-19ab-496c-ac02-e47a63afa9dc');
        const data = new FormData(); 
        data.append('link', link);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
          console.log(error);
        });
      },
    );
  }

  export default getPreviews;