import { Students } from '../studentList';

let data = [...Students];

const generateId = (data) =>
    data.reduce((acc, current) => Math.max(acc, current.stuID), 0) + 1;

export const getStudents = () => {
    return data;
};

export const addStudent = (student) => {
    student.stuID = generateId(data);
    student.inEdit = false;
    data.unshift(student);
    return data;
};

export const updateItem = (student) => {
    let index = data.findIndex((record) => record.stuID === student.stuID);
    data[index] = student;
    return data;
};
