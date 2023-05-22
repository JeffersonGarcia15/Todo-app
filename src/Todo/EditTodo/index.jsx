import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { TodoForm } from "../index.jsx";

export function EditTodo({ setTodos }) {
	const [todo, setTodo] = useState({});
	const { todoId } = useParams();

	useEffect(() => {
		async function getSingleTodo() {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
			if (response.ok) {
				const data = await response.json();
				setTodo(data);
			}
		}
		getSingleTodo();
	}, [todoId]);

	return <TodoForm todoObj={todo} formType="Edit" setTodos={setTodos} />;
}
