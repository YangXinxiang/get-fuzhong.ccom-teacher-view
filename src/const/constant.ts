// 常量枚举
export enum Constant {
    TeacherList = "/ccom/teacherList",
    UpdateTeacher = "/ccom/update",
}

export enum EnvHostEnu {
    DEV = "http://192.168.1.6:3000",
    OnLine = "http://localhost:3000",
}
// 怎么判断环境呢？  process.env.SERVER_ENV ？？
export const EnvHost = EnvHostEnu.DEV;