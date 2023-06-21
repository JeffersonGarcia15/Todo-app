import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { TodoForm } from "../index.jsx";

export function EditTodo({ setTodos, todos }) {
	const [todo, setTodo] = useState({});

	const { todoId } = useParams();
	// const todo = todos.find((currentTodo) => currentTodo.id === Number(todoId));

	// THIS WON"T PERSIST CHANGES AFTER GOING BACK TO THAT ROUTE.
	// useEffect(() => {
	// 	async function getSingleTodo() {
	// 		const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setTodo(data);
	// 		}
	// 	}
	// 	getSingleTodo();
	// }, []);

	// 	if (!todos.length) {
	// 	return null;
	// }
	console.log("THE TODOOOOS", todos);
	// return <TodoForm todoObj={todos.find((newTodo) => newTodo.id === Number(todoId))} formType="Edit" setTodos={setTodos} />;
	return <TodoForm todoObj={todos.find((newTodo) => newTodo.id === Number(todoId))} formType="Edit" setTodos={setTodos} />;

}
