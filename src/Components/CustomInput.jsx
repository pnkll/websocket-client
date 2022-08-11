const CustomInput = (props) =>{

    function handleChange(e){
        //props.setInputsData(props.inputsData.map((el,index)=> index === props.index ? props.placeholder === 'key' ? {...el, key: e.target.value} : {...el, value: e.target.value} : el))
        props.setInputsData(
            props.inputsData.map((el,index)=> el[0].value === props.elem.id ? el.map((elem,index)=>elem.key === props.elem.key ? {...elem, value: e.target.value} : elem) : el)
        )
    }
    //console.log(props)

    return <>
        {/* <input type="text" onChange={handleChange} placeholder={props.placeholder} value={props.inputsData[props.index][props.placeholder]}/> */}
        <input type="text" onChange={handleChange} />
    </>
}
export default CustomInput