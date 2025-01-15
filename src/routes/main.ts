import { Router } from 'express';
import todoController from '../controller/todoController';

const router: Router = Router();

router.get('/', todoController.getHome);

router.post('/add-task', todoController.addTask);

router.put('/edit-task/:id', todoController.editTask);

router.delete('/delete-task/:id', todoController.deleteTask);

router.put('/toggle-task/:id', todoController.toggleTask)

export default router;