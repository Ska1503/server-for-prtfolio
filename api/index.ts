import app from '../src/app'
import { Config } from '../src/config'
import { Logger } from '../src/utils'

const PORT = Config.getPort()

app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`)
})
