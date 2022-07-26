import { Students } from '../studentList';

let data = [...Students];

const generateId = (data) =>
    data.reduce((acc, current) => Math.max(acc, current.stuID), 0) + 1;

export const getItems = () => {
    return data;
};

export const insertItem = (item) => {
    item.stuID = generateId(data);
    item.inEdit = false;
    data.unshift(item);
    return data;
};
