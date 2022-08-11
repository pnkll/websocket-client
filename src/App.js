import { useEffect, useRef, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import { updateConnect } from './service/webSocket'

function App() {

  const ws = useRef()
  const [connection, setConnection] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    !connection && updateConnect(ws, setConnection, setData, data)
  }, [])

  function handleUpdate() {
    updateConnect(ws, setConnection, setData, data)
  }

  if (!connection || !ws.current) {
    return <>Соединение не установлено<br /><button onClick={handleUpdate}>Подключиться</button></>
  }


  return (
    <div className="App">
      <header className="App-header">
        Minta {connection ? 'online' : 'offline'}
      </header>
      {data ? <Table users={data.users} ws={ws.current} />
        : <button onClick={handleUpdate}>Установить соединение</button>}
    </div>
  );
}

export default App;
