import { Router } from 'express';
import { createOrUpdateCart, getCartById } from '../controller/cart.controller.js';

const router = Router();

router.route("/createOrUpdateCart").post(createOrUpdateCart);
router.get('/getcart/:id', getCartById);

export default router;
