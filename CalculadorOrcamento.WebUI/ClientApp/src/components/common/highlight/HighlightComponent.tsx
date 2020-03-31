import React from 'react';
import { getIndicesOf } from 'utils/stringHelper';

type Props = {
    value: string;
    partValue: string;
}

const HighlightComponent = (props: Props) => {
    const { value, partValue: inputValue } = props;

    const highlight = () => {
        let indices = getIndicesOf(inputValue, value, true);
        let length = inputValue.length;

        let valueArr = value.split('');

        let indexTemp = -1;

        return valueArr.map((part, index) => {
            let indice = indexTemp;
            if (indices.includes(index)) {
                indexTemp = index;
                indice = index;
            } else if (indexTemp !== -1 && index <= indexTemp + length - 1 && index >= indexTemp) {
                indice = index;
            } else {
                indexTemp = -1;
            }

            return (<span key={index} style={{ fontWeight: indice === index ? 700 : 400 }}>
                {part}
            </span>)
        })
    }

    return (<>
        {highlight()}
    </>)
}

export default HighlightComponent;