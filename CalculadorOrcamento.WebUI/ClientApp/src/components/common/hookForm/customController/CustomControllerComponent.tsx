import React from 'react';
import { Controller, ControllerProps, FieldName, FieldValues } from 'react-hook-form';

export type TrimType = "START" | "END" | "ALL";

export type Props = ControllerProps & {
    trim?: TrimType;
    watch(): FieldValues;
    setValue: <Name extends FieldName<FieldValues>>(name: Name, value: FieldValues[Name], shouldValidate?: boolean) => void | Promise<boolean>;
    triggerValidation: (payload?: FieldName<FieldValues> | FieldName<FieldValues>[] | string, shouldRender?: boolean) => Promise<boolean>;
}

export default function CustomControllerComponent(props: Props) {

    const watchAllFields = props.watch();

    const controllerProps = { ...props, trim: undefined, watch: undefined, setValue: undefined, triggerValidation: undefined };

    delete controllerProps.trim;
    delete controllerProps.watch;
    delete controllerProps.setValue;
    delete controllerProps.triggerValidation;


    const onBlurEvent = (event: any) => {
        if (props.onBlur)
            props.onBlur(event);

        if (props.trim)
            Object.keys(watchAllFields).forEach(key => trimValue(key));
    }

    const trimValue = (name: string) => {
        var field = watchAllFields[name];
        if (props.trim && field && typeof field === 'string') {
            switch (props.trim) {
                case "ALL":
                    props.setValue(name, watchAllFields[name].trim());
                    break;
                case "START":
                    props.setValue(name, watchAllFields[name].trimStart());
                    break;
                case "END":
                    props.setValue(name, watchAllFields[name].trimEnd());
                    break;
            }
            props.triggerValidation(name);
        }
    }

    return (
        <Controller {...controllerProps}
            onBlur={onBlurEvent}
        />
    );
}