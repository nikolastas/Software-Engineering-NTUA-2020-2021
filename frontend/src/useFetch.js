import { useState, useEffect} from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortCont = new AbortController();
    console.log(document.cookie);
    setTimeout(() => {
      fetch(url, {
        signal: abortCont.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Set-Cookie':[document.cookie],
        },
        credentials: "include",
        mode: "cors",
        
        })
      .then(res => {
        if (!res.ok) { // error coming back from server
          setData(null);
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;