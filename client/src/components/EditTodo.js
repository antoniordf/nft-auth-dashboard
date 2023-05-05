import React, { Fragment, useState } from "react";

const EditTodo = ({ todo, getTodos, userAddress }) => {
  const [description, setDescription] = useState(todo.description);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const newDescription = description;
      if (!newDescription) return;

      await fetch(`http://localhost:5500/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          UserAddress: userAddress,
        },
        body: JSON.stringify({ description: newDescription }),
      });
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#modal-${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`modal-${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={updateDescription}>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                  onClick={updateDescription}
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
