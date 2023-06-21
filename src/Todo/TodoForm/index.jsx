import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export function TodoForm({ setTodos, todoObj, formType }) {
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [completed, setCompleted] = useState(false);
	const [validations, setValidations] = useState({});

	useEffect(() => {
		setTitle(todoObj?.title);
		setCompleted(todoObj?.completed);
	}, [todoObj]);

	useEffect(() => {
		setValidations({});
		const errors = {};
		if (title?.length < 3) {
			errors.title = "Title must be at least 3 characters";
		}
		setValidations(errors);
	}, [title]);

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
	console.log("FJDKF", todoObj)


	return (
		<>
		{validations.title && <p>{validations.title}</p>}
			<form onSubmit={onSubmit}>
				<label>Title:</label>
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
				<label>Completed?</label>
				<input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
				<button disabled={Object.values(validations).length} type="submit">{formType} Todo</button>
			</form>
		
		</>
	);
}
