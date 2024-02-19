const convertToBase64 = (file, setFileData) => {
    console.log('convertToBase64 starts')
    console.log(file)
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let funcRes = reader.onload=()=>{
      console.log(reader.result)
      setFileData(reader.result)
    }
    reader.onerror=(error)=>{
      console.log("Error : ", error)
    }
    return funcRes()
    
}

export default convertToBase64