import net from 'net'
import readline from 'readline'


export default function (cfg, logger) {
  const PORT = cfg.port ?? 3000;
  // 创建 TCP 服务器
  const server = net.createServer((socket) => {
    console.log('客户端已连接');

    // 监听客户端发送的数据
    socket.on('data', (data) => {
      console.log(`收到消息: ${data}`);
      logger.info(data.toString())
    });

    // 监听客户端断开连接
    socket.on('end', () => {
      console.log('客户端已断开连接');
    });
  });

  const HOST = '0.0.0.0'; // 监听所有网络接口
  server.listen(PORT, HOST, () => {
    console.log(`服务器正在监听 ${HOST}:${PORT}`);
  });

  // 连接到另一台电脑
  let client;

  function handleConnect(host) {

    let _client = new net.Socket()
    _client.connect(PORT, host, () => {
      if (client) {
        client.end()
      }
      client = _client
      console.log(`已连接到 ${host}:${PORT}`);
    });

    _client.on('error', () => {
      console.log(`${host}:${REMOTE_PORT}连接失败`);
    })

  }

  // 监听终端的输入
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    if (input.startsWith('>')) {
      handleConnect(input.slice(1))
    } else if (client) {
      // 将输入的内容发送到另一台电脑
      client.write(input);
    }
  });

  process.on('SIGINT', () => {
    if (client) {
      client.destory()
    }
    process.exit()
  })
}