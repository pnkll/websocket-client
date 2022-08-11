const CustomInput = (props) =>{

    function handleChange(e){
        props.setInputsData(props.inputsData.map((el,index)=> index === props.index ? props.placeholder === 'key' ? {...el, key: e.target.value} : {...el, value: e.target.value} : el))
    }

    return <>
        <input type="text" onChange={handleChange} placeholder={props.placeholder} value={props.inputsData[props.index][props.placeholder]}/>
    </>
}
export default CustomInput