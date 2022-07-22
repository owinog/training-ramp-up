import {
    Grid,
    GridColumn as Column,
    GridToolbar,
} from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';
import { getItems } from '../services/services';
import { ActionCell } from './actionCell';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let newItems = getItems();
        setData(newItems);
    }, []);

    const funcCell = () => <ActionCell />;

    return (
        <Grid
            style={{
                height: '80vh',
            }}
            data={data}>
            <GridToolbar>
                <button
                    title='Add new'
                    className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>
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
            <Column cell={funcCell} width='150px' />
        </Grid>
    );
};
export default DataTable;
