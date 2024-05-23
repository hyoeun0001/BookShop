const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const getBookDetail = (req, res) => {
    let {book_id} = req.params;

    let sql = `SELECT * FROM books WHERE id = ?`;

    conn.query(sql,book_id,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            if(results[0]){
                res.status(StatusCodes.OK).json(results[0]);
            }else{
                res.status(StatusCodes.NOT_FOUND).end()
            }
        }
    )
};


module.exports = {
    getAllBooks,
    getBookDetail
};
