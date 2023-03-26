async function getRepositoryInfo() {
  
    let response = await fetch('https://api.github.com/repos/dmproj/var_hooks_TS_REACT');
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    let receivedLength = 0; // received that many bytes at the moment
    let chunks = []; // array of received binary chunks (comprises the body)
    while(true) {
      const {done, value} = await reader.read();
    
      if (done) {
        break;
      }
    
      chunks.push(value);
      receivedLength += value.length;
    
      console.log(`Received ${receivedLength} of ${contentLength}`)
    }
    
    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for(let chunk of chunks) {
      console.log("chunk",chunk)
      chunksAll.set(chunk, position); // (4.2)
      console.log("position",position)
      position += chunk.length;
    }
    
    let result = new TextDecoder("utf-8").decode(chunksAll);
    
    let commits = JSON.parse(result);
    console.log(commits.owner.login);
  }
  getRepositoryInfo()

// // Step 2: get total length
// let chunks = []
// let receivedLength = 0;
// const contentLength = +response.headers.get('Content-Length');
// console.log("contentLength",contentLength)
// const {done, value} = await reader.read();
// //console.log("done, value",done, value)
// chunks.push(value);
// console.log("",chunks)
// receivedLength += value.length
// console.log("receivedLength",receivedLength)
//     //console.log(response.headers);
//     for (let [key, value] of response.headers) {
//       console.log(`key${key} = value${value}`);
//     }
//   } catch (error) {
//     //console.error(error);
//   }