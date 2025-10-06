import {authLogin} from "../controller/authentication";
import {Router} from "express";

const router = Router();

router.post('/login', authenticationLogin);

export default router;