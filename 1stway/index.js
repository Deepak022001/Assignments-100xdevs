const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let todos = [
    {
        description: "Professor",
        title: "Money Heist",
        id: 1
    },
    {
        description: "asdas",
        title: "asdasf",
        id: 2
    },
];

function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return i;
    }
    return -1;
}

function removeAtIndex(arr, index) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (i !== index) newArray.push(arr[i]);
    }
    return newArray;
}

app.get('/todos', (req, res) => {
    res.json(todos);
});



// app.post('/todos', (req, res) => {
//     const newTodo = {
//         id: req.body.title,
//         title: req.body.title,
//         description: req.body.description
//     };
//     todos.push(newTodo);
//     res.status(201).json(newTodo);
// });
app.post('/todos', (req, res) => {
    const { id, title, description } = req.query; // Access parameters sent through URL

    const existingTodoIndex = todos.findIndex(todo => todo.id === Number(id));

    if (existingTodoIndex !== -1) {
        // Update existing todo
        todos[existingTodoIndex].title = title;
        todos[existingTodoIndex].description = description;

        res.status(200).json(todos[existingTodoIndex]);
    } else {
        // Create a new todo if ID doesn't exist
        const newTodo = {
            id: Number(id),
            title,
            description
        };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }
});



app.delete('/todos/:id',(req,res)=>{
    const todoIndex=findIndex(todos,parseInt(req.params.id));
    if(todoIndex===-1){
        res.status(404).send();
    }else {
        todos = removeAtIndex(todos, todoIndex);
        res.status(200).json({ message: "Todo deleted successfully" });
    }
})

app.use((req, res, next) => {
    res.status(404).send();
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
