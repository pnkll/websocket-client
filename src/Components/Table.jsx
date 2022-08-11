import { useEffect } from 'react'
import { useState } from 'react'
import { getUsers, updateUser, updateUsers } from '../service/webSocket'
import CustomInput from './CustomInput'

const Table = (props) => {

    const [sort, setSort] = useState(true)
    const [inputsData, setInputsData] = useState(null)

    useEffect(() => {
        setInputsData(props.users.map((el, index) => el && { key: '', value: '', error: null }))

        initState()
    }, [])

    function initState(){
            const keys = props.users.map(el => el && Object.keys(el))
            const values = props.users.map(el => el && Object.values(el))
                setInputsData(keys.map((el,index)=> 
                    el.map((elem, idx)=> elem && {key: elem, value: values[index][idx]})))
        }

    function handleSort() {
        getUsers(props.ws, sort ? 'DESC' : 'ASC')
        setSort(!sort)
    }

    function handleAdd(el, idx) {
        // console.log(sort)
        // if (inputsData[idx].value !== '' && inputsData[idx].key !== '') {
        //     updateUser(props.ws, sort ? 'ASC' : 'DESC', el[0].id, inputsData[idx].key, inputsData[idx].value)
        //     setInputsData(inputsData.map((el, index) => index === idx ? { ...el, error: null, value: '', key: '' } : el))
        // } else {
        //     setInputsData(inputsData.map((el, index) => index === idx ? { ...el, error: `Please fill ${inputsData[idx].value === '' && inputsData[idx].key !== '' ? 'value' : inputsData[idx].key === '' && inputsData[idx].value !== '' ? 'key' : ''}` } : el))
        // }

        const list = inputsData.map((el,idx)=> el.map((elem,index)=> el[elem.key] = elem.value))
        updateUsers(props.ws, list)
    }

    function handleRemove(id, key) {
        console.log(sort)
        updateUser(props.ws, sort ? 'ASC' : 'DESC', id, key)
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

    console.log(inputsData)

    return (
        <>
            <div className="table-container" style={{ display: "flex" }}>
                {computedData(props.users).map((el, index) => <div key={index} style={{ display: 'flex' }}>
                    {index === 0 &&
                        <div className="table__elem" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: "25px" }}>
                            <button onClick={handleAdd}>Отправить</button>
                            {el.map((element, index)=>
                               <div key={index} className='table__elem-valueee' style={{height: "25px", display: 'flex', alignItems: "center"}} onClick={() => element.key === 'id' && handleSort()}>{element.key}</div>
                            )}
                        </div>
                    }
                    <div key={index} className="table__elem" style={{ display: "flex", flexDirection: "column" }}>
                        {el.map((elem, subIndex) =>
                            <div key={subIndex} className='table__elem-value' style={{ background: elem.color, display: 'flex', justifyContent: 'space-between', alignItems: "center", height: '25px' }}>{elem.value}
                                {elem.value ? <button onClick={() => handleRemove(elem.id, elem.key)}>Delete</button> : <CustomInput elem={elem} setInputsData={setInputsData} inputsData={inputsData}/>}
                            </div>
                        )}
                        <p>{inputsData && inputsData[index].error}</p>
                    </div></div>)}
            </div>
        </>
    )
}

export default Table;


