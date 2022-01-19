import React from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

const READ_TODOS = gql`
  query todossss{
    todos {
      id
      text
      completed,
      isCreatedAt
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

function App() {

  const { data, loading, error } = useQuery(READ_TODOS);
  let input;
const [createTodo] = useMutation(CREATE_TODO);
const [deleteTodo] = useMutation(REMOVE_TODO);

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
console.log({data,loading,error,createTodo,deleteTodo})
  return (
    <div className="app">
      <h3>Create New Todo</h3>
      <form onSubmit={e => {
    e.preventDefault();
    createTodo({ variables: { text: input.value } });
    input.value = '';
    window.location.reload();
}}>
    <input className="form-control" type="text" placeholder="Enter todo" ref={node => { input = node; }}></input>
    <button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
</form>
      <ul>
        {data.todos.map((todo) =>
        <>
          <li key={todo.id}>
            <span className={todo.completed ? "done" : "pending"}>{todo.text}</span>
            <button className="btn btn-sm btn-danger rounded-circle float-right" onClick={() => {
      deleteTodo({ variables: { id: todo.id } });
      window.location.reload();
    }}>X</button>
          </li>
          
          </>
        )}
        
      </ul>
      
    </div>
  );
}

export default App;