import express, { Express, Request, Response, NextFunction } from 'express';    //启服务
import mongoose from 'mongoose';  //连接数据库的
import cors from 'cors';          //用来跨域的
import morgan from 'morgan';      //这是用来输入访问日志的
import helmet from 'helmet';      //用来进行安全过滤的
import 'dotenv/config';           //这是包的作用是读取.env文件然后写入process.env.JWT_SECRET_KEY
import path from 'path';
import HttpException from './exceptions/HttpException';
import errorMiddleware from './middlewares/errorMiddleware';
import * as userController from './controllers/user';
const app: Express = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());//express.json=bodyParser.json
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req, res, _next) => {
    res.json({ success: true, data: 'hello world' });
});
app.post('/user/register', userController.register);
app.post('/user/login', userController.login);
//客户端把token传给服务器，服务器返回当前的用户。如果token不合法或过期了，则会返null
app.get('/user/validate', userController.validate);
//如果说没有匹配到任何路由，则会创建一个自定义404错误对象并传递给错误处理中间件
app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error: HttpException = new HttpException(404, '尚未为此路径分配路由');
    next(error);
});
app.use(errorMiddleware);
(async function () {
    await mongoose.set('useNewUrlParser', true);
    await mongoose.set('useUnifiedTopology', true);
    const MONGODB_URL = process.env.MONGODB_URL || `mongodb://localhost/zhufengketangapp`;
    await mongoose.connect(MONGODB_URL);
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`);
    })
})();
