module.exports = {
    //是否开启DEBUG信息
    OPEN_A_DEBUGLOG: true,                      //日志类型A是否开启

    OPEN_B_DEBUGLOG: true,                     //日志类型B是否开启

    OPEN_C_DEBUGLOG: true,                     //日志类型C是否开启

    TOKEN: {
        DEFAULT_SECRET: 'secre_test',
        DEFAULT_EXPIRE: 6 * 60 * 60 * 1000	// default session expire time: 6 hours
    },
    USRE_TYPE: {
        UT1: 1, //需要验证密码的
        UT2: 2	//只需要根据用户名登录(设备ID匿名登录)
    },

    GATE: {
        FA_NO_SERVER_AVAILABLE: 2001
    },

    OK: 200,
    FAIL: 500,

    //服务器到服务器之间的消息类型定义
    S2SRPCMSGKIND: {
        KICKOUT_USER: 1                         //踢玩家

    },
    LogServerName: {
        CreateUser: 'CreateUser'                //创建角色
    },

    Adress:{
        IP:'123.57.28.15',
        PORT:80
    }
};
