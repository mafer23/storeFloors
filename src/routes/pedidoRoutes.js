// src/routes/pedidoRoutes.js
import { Router } from 'express';
import { createPedidoController, getPedidosAdminController,getPedidosUsuarioController,getPedidoDetallesController} from '../controllers/pedidoController.js';

const router = Router();

router.post('/createPedido', createPedidoController);
// Admin: todos los pedidos
router.get("/pedidosAdmin", getPedidosAdminController);

// Cliente: pedidos de un usuario
router.get("/usuario/:id_usuario", getPedidosUsuarioController);

// Detalles de un pedido específico
router.get("/pedidos/:id_pedido/detalles", getPedidoDetallesController);



export default router;
