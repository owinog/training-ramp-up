export const ActionCell = (props) => {
    const { dataItem } = props;
    const inEdit = dataItem[props.editField];
    const isNewItem = dataItem.stuID === undefined;
    return inEdit ? (
        <td className='k-command-cell'>
            <button
                className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command'
                onClick={() => (isNewItem ? props.add(dataItem) : '')}>
                {isNewItem ? 'Add' : 'Update'}
            </button>
            <button
                className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command'
                onClick={() => (isNewItem ? props.discard(dataItem) : '')}>
                {isNewItem ? 'Discard' : ''}
            </button>
        </td>
    ) : (
        <td className='k-command-cell'>
            <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command'>
                Edit
            </button>
            <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command'>
                Remove
            </button>
        </td>
    );
};
