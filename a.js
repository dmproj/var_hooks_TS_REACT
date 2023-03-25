async function getRepositoryInfo() {
  try {
    const response = await fetch('https://api.github.com/repos/dmproj/var_hooks_TS_REACT');
    
    console.log(response.headers);
    for (let [key, value] of response.headers) {
      alert(`${key} = ${value}`);
    }
  } catch (error) {
    console.error(error);
  }
}

getRepositoryInfo();