const express = require('express'); // Import express module
const app = express(); // Create an Express app

let todos = []; // Rename newtodo to todos

function findIndex(todos, id) {
  return todos.findIndex(todo => todo.id === id);
}

function removeIndex(todos, index) {
  todos.splice(index, 1);
}

app.use(express.json()); // Parse JSON bodies

app.get('/todos', (req, res) => {
  res.json(todos); // Return todos array directly, no need to parse it again
});

app.post('/todos', (req, res) => {
  const { id, title, description } = req.query;
  const current_index = findIndex(todos, id);
  
  if (current_index !== -1) {
    todos[current_index].title = title;
    todos[current_index].description = description;

    res.status(200).json(todos[current_index]);
  } else {
    const newTodo = {
      id: id,
      title: title,
      description: description
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  }
});

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
