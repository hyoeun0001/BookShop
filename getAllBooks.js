const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const getAllBooks = (req, res) => {
    let {category_id} = req.query

    if (category_id) {
        let sql = `SELECT * FROM books WHERE category_id = ?`;
        conn.query(sql, category_id,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                if (results) {
                    res.status(StatusCodes.OK).json(results);
                } else {
                    res.status(StatusCodes.NOT_FOUND).end()
                }
            }
        )
    } else {
        let sql = `SELECT * FROM books `;
        conn.query(sql,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                if (results) {
                    res.status(StatusCodes.OK).json(results)
                }
            }
        )
    }
};

module.exports = {
    getAllBooks,
    getBookDetail
};
