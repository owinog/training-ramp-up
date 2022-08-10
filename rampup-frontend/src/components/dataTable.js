import {
    Grid,
    GridColumn as Column,
    GridToolbar,
} from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
} from "../services/services";
import { useQuery, gql } from "@apollo/client";
import { ActionCell } from "./actionCell";
import { io } from "socket.io-client";

const FETCH_STUDENTS = gql`
    query {
        getAllStudents {
            id
            studentName
            address
            phone
            gender
            dob
            age
        }
    }
`;

const ADD_STUDENT = gql`
    mutation createStudentMutation(
        $studentName: String!
        $gender: String!
        $address: String!
        $phone: String!
        $dob: DateTime!
        $age: Int!
    ) {
        createStudent(
            createStudentInput: {
                studentName: $studentName
                address: $address
                phone: $phone
                gender: $gender
                dob: $dob
                age: $age
            }
        ) {
            id
            studentName
        }
    }
`;

const UPDATE_STUDENT = gql`
    mutation updateStudentMutation(
        $id: String!
        $studentName: String!
        $gender: String!
        $address: String!
        $phone: String!
        $dob: DateTime!
        $age: Int!
    ) {
        updateStudent(
            updateStudentInput: {
                id: $id
                studentName: $studentName
                address: $address
                phone: $phone
                gender: $gender
                dob: $dob
                age: $age
            }
        ) {
            id
            studentName
        }
    }
`;

const REMOVE_STUDENT = gql`
    mutation removeStudentMutation($id: String!) {
        removeStudent(id: $id) {
            __typename
        }
    }
`;

const DataTable = () => {
    const [dataArr, setDataArr] = useState([]);

    //fetchAll Query
    const { data, loading, error, refetch } = useQuery(FETCH_STUDENTS);
    //Mutations
    const [createStudentMutation] = useMutation(ADD_STUDENT);
    const [updateStudentMutation] = useMutation(UPDATE_STUDENT);
    const [removeStudentMutation] = useMutation(REMOVE_STUDENT);

    useEffect(() => {
        const newItems = data?.getAllStudents;
        setDataArr(newItems);
        if (data) {
            let stdNewData = newItems.map((student) => {
                let dob = new Date(student.dob);
                return { ...student, dob };
            });
            setDataArr(stdNewData);
        }
    }, [data]);

    const add = async (dataItem) => {
        dataItem.inEdit = true;
        await createStudentMutation({
            variables: {
                studentName: dataItem.studentName,
                address: dataItem.address,
                gender: dataItem.gender,
                dob: new Date(dataItem.dob),
                age: dataItem.age,
                phone: dataItem.phone,
            },
        });
        refetch();
    };

    const discard = () => {
        const newData = [...dataArr];
        newData.splice(0, 1);
        setDataArr(newData);
    };

    const update = async (dataItem) => {
        let index = dataArr.findIndex((record) => record.id === dataItem.id);
        dataItem = dataArr[index];

        await updateStudentMutation({
            variables: {
                id: dataItem.id,
                studentName: dataItem.studentName,
                address: dataItem.address,
                gender: dataItem.gender,
                dob: new Date(dataItem.dob),
                age: dataItem.age,
                phone: dataItem.phone,
            },
        });
        dataItem.inEdit = false;
        refetch();
    };

    const cancel = (dataItem) => {
        const originalItem = data.getAllStudents.find(
            (p) => p.id === dataItem.id
        );
        const dob = new Date(originalItem.dob);
        const newData = dataArr.map((item) =>
            item.id === originalItem.id ? { ...originalItem, dob } : item
        );
        setDataArr(newData);
    };

    const remove = async (dataItem) => {
        await removeStudentMutation({ variables: { id: dataItem.id } });
        refetch();
    };

    const addNew = () => {
        const newDataItem = {
            inEdit: true,
        };
        setDataArr([newDataItem, ...dataArr]);
    };

    const enterEdit = (dataItem) => {
        setDataArr(
            dataArr.map((student) =>
                student.id === dataItem.id
                    ? { ...student, inEdit: true }
                    : student
            )
        );
    };

    const itemChange = (event) => {
        const newData = dataArr.map((item) =>
            item.id === event.dataItem.id
                ? { ...item, [event.field || ""]: event.value }
                : item
        );
        setDataArr(newData);
    };

    const funcCell = (props) => (
        <ActionCell
            {...props}
            add={add}
            remove={remove}
            editField={"inEdit"}
            discard={discard}
            edit={enterEdit}
            update={update}
            cancel={cancel}
        />
    );

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    return (
        <center>
            <Grid
                style={{
                    height: "70vh",
                    width: "90vw",
                }}
                data={dataArr}
                onItemChange={itemChange}
                editField={"inEdit"}
            >
                <GridToolbar>
                    <button
                        title="Add new"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                        onClick={addNew}
                    >
                        Add new
                    </button>
                </GridToolbar>
                <Column field="id" title="ID" editable={false} />
                <Column field="studentName" title="Name" />
                <Column field="gender" title="Gender" width="100px" />
                <Column field="address" title="City" width="120px" />
                <Column field="phone" title="Mobile No" width="100px" />
                <Column
                    field="dob"
                    title="Date of Birth"
                    editor="date"
                    format="{0:d}"
                />
                <Column
                    field="age"
                    title="Age"
                    editor="numeric"
                    width="100px"
                />
                <Column cell={funcCell} width="200px" />
            </Grid>
        </center>
    );
};
export default DataTable;
