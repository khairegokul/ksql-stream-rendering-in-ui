import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
const ENDPOINT = "http://127.0.0.1:4001";
function App() {
  //const [response, setResponse] = useState("");
  const records = useSelector(state => state)
   const dispatch = useDispatch()
  
  useEffect(() => {
    const socket = openSocket(ENDPOINT,{transports: ['websocket']});
    //var records=[];
    socket.on("FromAPI", data => {

      //records.push(data)
      dispatch({type: "add_record", payload: data})
      //setResponse(records);
    });
  }, [dispatch]);

  const renderedRecords= records.reverse().map(record => {
    return <li key={record}>{record}</li>
  })

  return <ul>{renderedRecords}</ul>
  // return (
  //   <p>
  //     It's <time dateTime={response}>{response}</time>
  //   </p>
  // );
}

export default App;