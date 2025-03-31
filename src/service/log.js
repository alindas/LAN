import log4js from 'log4js';

log4js.configure({
    appenders: {
        file: {
            type: 'dateFile',
            filename: 'logs/chat.log',
            pattern: 'yyyy-MM-dd',
            maxLogSize: 10 * 1024 * 1024, // 10MB
            backups: 5 // 保留旧日志文件数
        }
    },
    categories: {
        default: {
            appenders: ['file'], // 输出位置
            level: 'info'
        }
    }
});

export default function () {
    return log4js.getLogger();
}