export const getUsers = (ws, sort) => {
    !sort ? ws.onopen = () => {
        ws.send(JSON.stringify({ method: 'get', event: 'users', sort: sort ? sort : 'ASC' }))
    } : ws.send(JSON.stringify({ method: 'get', event: 'users', sort: sort ? sort : 'ASC' }))
}

export const updateUser = (ws, sort, id, field, value) => {
    ws.send(JSON.stringify({ method: 'update', event: 'user', id: id, field: field, value: value ? value : null, sort: sort ? sort : 'ASC' }))
}

export const updateConnect = (ws, setConnection, setData, data, func) => {
    ws.current = new WebSocket('ws://localhost:3001')
    ws.current.onopen = () => {
        setConnection(true)
        console.log('Успешное подключение')
        !data && getUsers(ws.current)
    }
    ws.current.onclose = () => {
        setConnection(false)
        console.log('Соединение разорвано')
    }
    ws.current.onmessage = (e) => {
        setData(JSON.parse(e.data))
    }
}

export const updateUsers = (ws,list) => {
    ws.send(JSON.stringify({ method: 'update', event: 'users', list}))
}