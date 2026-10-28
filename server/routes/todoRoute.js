import express from 'express';
import { addTodo, dltTodo, getTodo, updTodo } from '../controller/todoController.js';
// import { updTodo } from '../controller/userController.js';

const router=express.Router();

router.post('/add',addTodo);
router.get('/:userId',getTodo)
router.put('/update/:id',updTodo);
router.delete('/delete/:id',dltTodo);
export default router;