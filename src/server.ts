import app from './app'
import { Config } from './config'
import { Logger } from './utils'

const PORT = Config.getPort()

app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`)
})
