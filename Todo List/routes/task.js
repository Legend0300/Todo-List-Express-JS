const express = require('express');
const app = express();
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

router.get('/', async(req, res) => {
    const tasks = await prisma.task.findMany({});
    res.render('tasks'  , {tasks: tasks});
});



router.get('/delete/:id', async(req, res) => {
    const id = parseInt(req.params.id);


    const findtask = await prisma.task.findUnique({
        where :
        {
            id: id,
        }
    });

    if (!findtask) {
        console.log(`Task does not exist!`);
        res.send(`Task does not exist!`);
    }
    else{
        const task = await prisma.task.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.send(`Deleted task: ${task.name} (ID: ${task.id}) <button><a href="/home">Home</a></button>`);

    }
        return;
    });


router.get('/update/:id', async(req, res) => {
        const id = parseInt(req.params.id);
        res.render("update_form" , {id: id});
        });



module.exports = router;