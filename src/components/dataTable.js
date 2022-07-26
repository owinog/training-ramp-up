import {
    Grid,
    GridColumn as Column,
    GridToolbar,
} from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';
import { getItems, insertItem } from '../services/services';
import { ActionCell } from './actionCell';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let newItems = getItems();
        setData(newItems);
    }, []);

    const add = (dataItem) => {
        dataItem.inEdit = true;
        const newData = insertItem(dataItem);
        setData(newData);
    };

    const discard = () => {
        const newData = [...data];
        newData.splice(0, 1);
        setData(newData);
    };

    const itemChange = (event) => {
        const newData = data.map((item) =>
            item.stuID === event.dataItem.stuID
                ? { ...item, [event.field || '']: event.value }
                : item
        );
        setData(newData);
    };

    const addNew = () => {
        const newDataItem = {
            inEdit: true,
        };
        setData([newDataItem, ...data]);
    };

    const funcCell = (props) => (
        <ActionCell
            {...props}
            add={add}
            editField={'inEdit'}
            discard={discard}
        />
    );

    return (
        <Grid
            style={{
                height: '80vh',
            }}
            data={data}
            onItemChange={itemChange}
            editField={'inEdit'}>
            <GridToolbar>
                <button
                    title='Add new'
                    className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'
                    onClick={addNew}>
                    Add new
                </button>
            </GridToolbar>
            <Column field='stuID' title='ID' editable={false} />
            <Column field='StudentName' title='Name' />
            <Column field='gender' title='Gender' />
            <Column field='address' title='Address' />
            <Column field='phone' title='Mobile No' />
            <Column
                field='dob'
                title='Date of Birth'
                editor='date'
                format='{0:d}'
            />
            <Column field='age' title='Age' editor='numeric' />
            <Column cell={funcCell} width='200px' />
        </Grid>
    );
};
export default DataTable;
