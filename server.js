// parse the .env file and inject it in the Node process
import 'dotenv/config'

import app from './src/app.js'

const PORT = process.env.PORT

// launching the server
app.listen(PORT, () => {
  console.info(`Your server is working like a charm (PORT ${PORT})`)
})
