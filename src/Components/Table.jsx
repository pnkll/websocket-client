import { useEffect } from 'react'
import { useState } from 'react'
import { getUsers, updateUser } from '../service/webSocket'
import CustomInput from './CustomInput'

const Table = (props) => {

    const [sort, setSort] = useState(true)
    const [inputsData, setInputsData] = useState(null)

    useEffect(() => {
        setInputsData(props.users.map((el, index) => el && { key: '', value: '', error: null }))
    }, [])

    function handleSort() {
        getUsers(props.ws, sort ? 'DESC' : 'ASC')
        setSort(!sort)
    }

    function handleAdd(el, idx) {
        if (inputsData[idx].value !== '' && inputsData[idx].key !== '') {
            updateUser(props.ws, sort ? 'DESC' : 'ASC', el[0].id, inputsData[idx].key, inputsData[idx].value)
            setInputsData(inputsData.map((el, index) => index === idx ? { ...el, error: null, value: '', key: '' } : el))
        } else {
            setInputsData(inputsData.map((el, index) => index === idx ? { ...el, error: `Please fill ${inputsData[idx].value === '' && inputsData[idx].key !== '' ? 'value' : inputsData[idx].key === '' && inputsData[idx].value !== '' ? 'key' : ''}` } : el))
        }
    }

    function computedData(users) {
        const data = users.map((el, index) =>
            Object.keys(el).map((elem, index) => elem && { key: elem, value: Object.values(el)[index], color: el.color, id: el.id })
        )
        return data
    }

    if (!inputsData || !props.users) {
        return <>Загружаем ...</>
    }

    return (
        <>
            <div className="table-container" style={{ display: "flex" }}>
                {computedData(props.users).map((el, index) => <div key={index} style={{ display: 'flex' }}>
                    {index === 0 && <div className="table__elem" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <div className="table__elem-value" onClick={() => handleSort()}>id:</div>
                        <div className="table__elem-value">firstname:</div>
                        <div className="table__elem-value">lastname:</div>
                        <div className="table__elem-value">age</div>
                        <div className="table__elem-value">country</div>
                    </div>}
                    <div key={index} className="table__elem" style={{ display: "flex", flexDirection: "column" }}>
                        <button onClick={() => handleAdd(el, index)}>Append</button>
                        {el.map((elem, subIndex) =>
                            <div key={subIndex} className='table__elem-value' style={{ background: elem.color, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>{elem.value}
                                <button onClick={() => updateUser(props.ws, sort ? 'ASC' : 'DESC', elem.id, elem.key)}>Delete</button>
                            </div>
                        )}
                        <CustomInput placeholder='key' index={index} inputsData={inputsData} setInputsData={setInputsData} />
                        <CustomInput placeholder='value' index={index} inputsData={inputsData} setInputsData={setInputsData} />
                        <p>{inputsData && inputsData[index].error}</p>
                    </div></div>)}
            </div>
        </>
    )
}

export default Table;


