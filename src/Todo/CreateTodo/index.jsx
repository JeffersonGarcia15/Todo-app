import React from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoForm } from "../index.jsx";

export function CreateTodo({ setTodos }) {
	const todoObj = {
		id: uuidv4(),
		title: "",
		completed: false,
		userId: 1,
	};

	return <TodoForm todoObj={todoObj} formType={"Create"} setTodos={setTodos} />;
}
