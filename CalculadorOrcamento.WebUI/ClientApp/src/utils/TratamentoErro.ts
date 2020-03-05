
const TratarErro = (erro: any) => {
    if (erro.response) {
        let response = erro.response;
        if (response.data) {
            let data = response.data;
            if (data.message) {
                if (!data.failures)
                    return data.message;
                else {
                    let failures = data.failures;

                    let errors: any[] = [];

                    Object.keys(failures).map(key => {
                        errors = errors.concat(failures[key])
                    });

                    if (errors.length > 0) {
                        return errors.join("\n");
                    }
                }
            }
        }
    }
    return "";
}

export default TratarErro;