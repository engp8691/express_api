import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import itemRoutes from './routes/itemRoutes'
import userRoutes from './routes/userRoutes'
import roleRoutes from './routes/roleRoutes'
import { errorHandler } from './middlewares/errorHandler'
import { logger } from './middlewares/logger'
import { checkContentTypeAndAccept } from './middlewares/checkContentTypeAndAccept'
import { swaggerSpec } from './swagger/config'

const app = express()
app.use(logger)
app.use(cors())
app.use(checkContentTypeAndAccept)

// For older versions of express, bodyParser is required
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// For express v4.16.0 or newer, built in express.json() is prefered
// app.use(express.json());

// Routes
app.use('/api/items', itemRoutes)
app.use('/api/users', userRoutes)
app.use('/api/roles', roleRoutes)

// Global error handler (should be after routes)
app.use(errorHandler)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app
