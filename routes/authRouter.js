import express, { response } from 'express'
import { loginRegister, userRegister } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/register', userRegister)

authRouter.post('/login', loginRegister)

export default authRouter