import mongoose, { Schema, Model, Document, HookNextFunction } from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../typings/payload';
export interface UserDocument extends Document {
    username: string;
    password: string;
    avatar: string;
    email: string;
    getAccessToken: () => string
}
const UserSchema: Schema<UserDocument> = new Schema({
    username: {
        type: String,
        required: [true, '用户名不能为空'],
        minlength: [6, '最小长度不能小于6位'],
        maxlength: [12, '最大长度不得大于12位']
    },
    password: String,
    avatar: String,
    email: {
        type: String,
        validate: {//自定义较验器
            validator: validator.isEmail
        },
        trim: true//   email='  xx@qq.com ' 存的时候是否要去空格
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (_doc: any, result: any) {
            result.id = result._id;
            delete result._id;
            delete result.__v;
            delete result.password;
            delete result.createdAt;
            delete result.updatedAt;
            return result;
        }
    }
});//使用时间戳 会自动添加两个字段 createdAt updatedAt
//在每次保存文档之前执行什么操作
UserSchema.pre<UserDocument>('save', async function (next: HookNextFunction) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcryptjs.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});
//给 User这个模型 扩展了一个方法login
UserSchema.static('login', async function (this: any,
    username: string, password: string): Promise<UserDocument | null> {
    let user: UserDocument | null = await this.model('User').findOne({ username });
    if (user) {
        //判断用户输入的密码和数据库里存的密码是否能匹配
        const matched = await bcryptjs.compare(password, user.password);
        if (matched) {
            return user;
        } else {
            return null;
        }
    } else {
        return null;
    }
})
// 给User模型的实例扩展getAccessToken方法
UserSchema.methods.getAccessToken = function (this: UserDocument): string {
    //this.id是一个语法糖，或者说快捷方式，指向this._id
    let payload: UserPayload = { id: this.id };//payload是放在放在jwt token里存放的数据
    return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'zhufeng', { expiresIn: '1h' });
}
interface UserModel<T extends Document> extends Model<T> {
    login: (username: string, password: string) => UserDocument | null
}
export const User: UserModel<UserDocument> = mongoose.model<UserDocument, UserModel<UserDocument>>('User', UserSchema);
