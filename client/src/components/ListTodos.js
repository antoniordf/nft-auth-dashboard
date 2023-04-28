import React, { Fragment, useEffect, useState, useCallback } from "react";

const ListTodos = ({ userAddress }) => {
  const [todos, setTodos] = useState([]);

  const getTodos = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5500/todos", {
        headers: { userAddress: userAddress },
      });
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }, [userAddress]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <Fragment>
      <h1>List Todos</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.description}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ListTodos;
