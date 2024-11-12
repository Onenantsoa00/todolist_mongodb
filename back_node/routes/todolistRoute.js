import express from 'express';
import controller from '../controller/todolistController.js';

const router = express.Router();

router.get('/todolist_read', controller.read);
router.post('/todolist_create', controller.create);
router.put('/todolist_update/:id', controller.update_by_id);
router.put('/todolist_update_by_name/:nom', controller.update_by_name);
router.delete('/todolist_delet/:id', controller.delet_by_id);
router.delete('/todolist_delet_by_name/:nom', controller.delet_by_name);
router.get('/get_element_by_status', controller.get_element_by_status);
router.get('/filtrage_by_name', controller.triage_par_nom);

export default router;
