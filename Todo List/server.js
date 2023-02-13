const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3001" }));


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const form = require('./routes/form');
const tasks = require('./routes/task');


app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));
app.use('/form', form)
app.use("/task", tasks)

app.get('/home', (req, res) => {
    res.render("home");
});


app.post('/response', async(req, res) => {
    taskname = req.body.taskname
    const findtask = await prisma.task.findUnique({
        where :
        {
            name: taskname,
        }
    });

    if (findtask) {
        res.send(`Found task: ${findtask.name} already exists <button><a href="/home">Home</a></button>`);
        return;
    }
    else{

    }
    const newTask = await prisma.task.create({
        data: {
            name: taskname,
        },
    });

    res.send(`Created new task: ${newTask.name} (ID: ${newTask.id}) <button><a href="/home">Home</a></button>`);

});

app.delete('delete/:id', async(req, res) => {
    const id = req.params.id;
    const task = await prisma.task.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.send(`Deleted task: ${task.name} (ID: ${task.id}) <button><a href="/home">Home</a></button>`);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }  
);