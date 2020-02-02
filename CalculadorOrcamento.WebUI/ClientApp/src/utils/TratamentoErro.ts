
const TratarErro = (erro: any) => {
    console.log(erro);
    if (erro.response) {
        let response = erro.response;
        console.log("response", response)
        if (response.data) {
            let data = response.data;
            console.log(data)
            if (data.message)
                return data.message;
        }
    }
    return "";
}

export default TratarErro;