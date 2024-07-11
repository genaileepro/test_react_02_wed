import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../../redux/modules/todos.js';

const Form = () => {
    const dispatch = useDispatch();
    const todos = useSelector((reduceTodos) => reduceTodos.todos.todos);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const onTitleHd = (event) => {
        setTitle(event.target.value);
    };
    const onBodyHd = (event) => {
        setBody(event.target.value);
    };

    const plusTodoButton = (event) => {
        event.preventDefault();
        dispatch(
            addTodo({
                id: todos.length + 1,
                title: title.trim(),
                body: body.trim(),
                isDone: false,
            })
        );
        if (title !== '' && body !== '') {
            setTitle('');
            setBody('');
        }
    };

    return (
        <StAddForm>
            <StInputGroup>
                <StFormLabel>제목</StFormLabel>
                <StAddInput type="text" value={title} onChange={onTitleHd} />
                <StFormLabel>내용</StFormLabel>
                <StAddInput type="text" value={body} onChange={onBodyHd} />
            </StInputGroup>
            <StAddButton onClick={plusTodoButton}>추가하기</StAddButton>
        </StAddForm>
    );
};

export default Form;

const StInputGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const StFormLabel = styled.label`
    font-size: 16px;
    font-weight: 700;
`;

const StAddForm = styled.form`
    background-color: #eee;
    border-radius: 12px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    gap: 20px;
`;

const StAddInput = styled.input`
    height: 40px;
    width: 240px;
    border: none;
    border-radius: 12px;
    padding: 0 12px;
`;

const StAddButton = styled.button`
    border: none;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;
    background-color: teal;
    width: 140px;
    color: #fff;
    font-weight: 700;
`;
