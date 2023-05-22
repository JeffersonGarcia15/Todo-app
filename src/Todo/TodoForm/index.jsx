import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export function TodoForm({ setTodos, todoObj, formType }) {
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		setTitle(todoObj.title);
		setCompleted(todoObj.completed);
	}, [todoObj]);

	async function onSubmit(e) {
		e.preventDefault();
		const newTodo = { ...todoObj, title, completed };
		if (formType === "Edit") {
			setTodos((prevState) =>
				prevState.map((todo) => {
					if (todo.id === parseInt(newTodo.id, 10)) {
						return newTodo;
					}

					return todo;
				})
			);
			await fetch(`https://jsonplaceholder.typicode.com/todos/${newTodo.id}`, {
				method: "PUT",
				body: JSON.stringify(newTodo),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
			history.push("/");

			return;
		}
		setTodos((prevTodos) => [...prevTodos, newTodo]);

		const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodo),
		});
		if (response.ok) {
			const data = await response.json();
			setTitle("");
			setCompleted(false);
			// setTodos((prevTodos) => [...prevTodos, data]);
			history.push("/");

			return;
		}
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoObj.id));

		return;
	}

	return (
		<form onSubmit={onSubmit}>
			<label>Title:</label>
			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
			<label>Completed?</label>
			<input type="checkbox" value={completed} onChange={(e) => setCompleted(e.target.checked)} />
			<button type="submit">{formType} Todo</button>
		</form>
	);
}
