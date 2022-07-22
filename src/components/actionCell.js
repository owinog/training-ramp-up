export const ActionCell = () => {
    return (
        <td className='k-command-cell'>
            <button
                className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command'
                onClick={() => {}}>
                Edit
            </button>
            <button
                className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command'
                onClick={() => {}}>
                Remove
            </button>
        </td>
    );
};
