const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');//jwt 모듈
const crypto = require('crypto');
const dotenv = require('dotenv');//dotenv 모듈
dotenv.config();

const join = (req, res) => {
    const {email, password} = req.body;

    let sql = `INSERT INTO users (email, password, salt) VALUES(?, ?, ?)`;
    
    //회원가입 시 비번 암호화해서 암호화된 비밀번호와, salt 값을 같이 저장
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')
    
    let values = [email, hashPassword, salt];
    conn.query(sql, values,
        (err, results)=>{
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.CREATED).json(results);
        }
    )
};
