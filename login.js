const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');//jwt 모듈
const crypto = require('crypto');
const dotenv = require('dotenv');//dotenv 모듈
dotenv.config();

const login = (req, res) => {
    const {email, password} = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const loginUser = results[0];

            //salt 값을 꺼내 날 것으로 들어온 비번을 암호화 해보고 
            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');
            

            //디비에 저장된 암호화 비교
            if (loginUser && loginUser.password == hashPassword) {
                const token = jwt.sign({
                    email : loginUser.email
                }, process.env.PRIVATE_KEY, {
                    expiresIn : '5m',
                    issuer : "hyoeun"
                });

                res.cookie("token",token,{
                    httpOnly : true
                });
                console.log(token);
                
                res.status(StatusCodes.OK).json({
                    message: `${loginUser.email}님 로그인 되었습니다.`,
                    results
                })
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "이메일 또는 비밀번호가 틀렸습니다."
                })
            }
        }
    )
}

module.exports = {
    join,
    login,
    passwordtResetRequest,
    passwordReset
};
