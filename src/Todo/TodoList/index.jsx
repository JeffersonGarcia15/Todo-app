import { Link } from "react-router-dom";

function TodoList({ todos, setTodos }) {
	async function deleteTodo(e, todoId) {
		e.preventDefault();
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
		await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
			method: "DELETE",
		});
	}

	return (
		<>
			<h1>Welcome to the Todo List!</h1>
			<Link to="/todo/new">Create Todo</Link>
			{todos.slice(190).map((todo) => (
				<div key={todo.id}>
					<li>{todo.title}</li>
					<button type="submit" onClick={(e) => deleteTodo(e, todo.id)}>
						Delete Todo
					</button>
					<Link to={`/todo/${todo.id}/edit`}>Edit Todo</Link>
				</div>
			))}
		</>
	);
}

export default TodoList;
