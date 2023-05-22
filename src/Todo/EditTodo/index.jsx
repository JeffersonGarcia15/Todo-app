import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { TodoForm } from "../index.jsx";

export function EditTodo({ setTodos, todos }) {
	const [todo, setTodo] = useState({});
	if (!todos.length) {
		return null;
	}
	const { todoId } = useParams();
	// const todo = todos.find((currentTodo) => currentTodo.id === Number(todoId));

	// THIS WON"T PERSIST CHANGES AFTER GOING BACK TO THAT ROUTE.
	useEffect(() => {
		async function getSingleTodo() {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
			if (response.ok) {
				const data = await response.json();
				setTodo(data);
			}
		}
		getSingleTodo();
	}, []);

	return <TodoForm todoObj={todo} formType="Edit" setTodos={setTodos} />;
}
