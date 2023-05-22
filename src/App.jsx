import "./App.css";

import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import TodoList, { CreateTodo, EditTodo } from "./Todo/index.jsx";

function App() {
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		async function getTodos() {
			const response = await fetch("https://jsonplaceholder.typicode.com/todos");
			if (response.ok) {
				const data = await response.json();
				setTodos(data);
			}
		}
		getTodos();
	}, []);

	return (
		<Switch>
			<Route exact path="/">
				<TodoList todos={todos} setTodos={setTodos} />
			</Route>
			<Route exact path="/todo/new">
				<CreateTodo setTodos={setTodos} />
			</Route>
			<Route exact path="/todo/:todoId/edit">
				<EditTodo setTodos={setTodos} />
			</Route>

			<Route>
				<h1>Not Found.</h1>
			</Route>
		</Switch>
	);
}

export default App;
