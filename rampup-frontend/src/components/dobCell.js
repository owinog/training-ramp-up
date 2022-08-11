import { DatePicker } from "@progress/kendo-react-dateinputs";
import { useEffect, useState } from "react";

const DobCell = (props) => {
    const [value, setValue] = useState(new Date());
    const { dataItem } = props;
    const field = props.field || "";
    const data = dataItem[field];

    useEffect(() => {
        setValue(data);
    }, []);

    const handleOnChange = (e) => {
        if (props.onChange) {
            setValue(e.value);

            props.onChange({
                dataItem: props.dataItem,
                field: props.field,
                syntheticEvent: e.syntheticEvent,
                value: e.value,
                dataIndex: 0,
            });
        }
    };

    const year = value?.getFullYear();
    const month = value?.getMonth();
    const date = value?.getDate();
    const max = new Date();

    return (
        <td>
            {dataItem.inEdit ? (
                <DatePicker max={max} value={value} onChange={handleOnChange} />
            ) : (
                `${1 + month}/${date}/${year}`
            )}
        </td>
    );
};
export default DobCell;
