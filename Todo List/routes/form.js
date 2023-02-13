const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', (req, res) => {
    res.render('form');
});


router.post('/update_task/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const findtask = await prisma.task.findUnique({
        where :
        {
            id: id,
        }
    });

    if (!findtask) {
        res.send(`Task does not exist!`);
    }
    else{
        const task = await prisma.task.update({
            where: {
                id: parseInt(id),
            }, data: {
                name: req.body.taskname,

            }
        });
        res.send(`updated Task: ${task.name} (ID: ${task.id}) <button><a href="/home">Home</a></button>`);
    }
        return;
    });

module.exports = router;