import React, { Fragment, useEffect, useState, useCallback } from "react";

import EditTodo from "./EditTodo";

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
      <table>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>
                <EditTodo
                  todo={todo}
                  getTodos={getTodos}
                  userAddress={userAddress}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
