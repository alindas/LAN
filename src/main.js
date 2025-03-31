import initConfig from './service/config.js'
import initLogger from './service/log.js'
import initServer from './service/socket.js'

(async () => {
    const cfg = await initConfig();
    const logger = initLogger();

    initServer(cfg, logger)
})()