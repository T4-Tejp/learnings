const mysql = require("../../include/database/mysql");
const logger = require("../../../config/logger");

class MysqlQuery {

    constructor() {
    }

    getPagination(req) {
        let page, size, limit_query;
        page = parseInt(req.body.page);
        size = parseInt(req.body.size);
        const limit = size ? +size : 10;
        const offset = (page === 0 || page === 1 || !page) ? 0 : (page - 1) * limit;
        limit_query = " LIMIT "+limit +" OFFSET "+offset;
        return { limit_query, page, limit };
    }

    getOrderBy(req) {
        let orderby, orderby_field, orderby_query;
        if(req.body.order_key_value) {
            orderby_query = " ORDER BY " + req.body.order_key_value.order_key + " " + req.body.order_key_value.order_value;
        }else {
            orderby = req.body.orderby;
            orderby = orderby.toLowerCase();
            orderby_field = (req.body.orderby_field) ? req.body.orderby_field : req.body.orderby_default_field;
            orderby = (orderby) ? orderby.toLowerCase() : 'ASC';
            orderby = (orderby === 'desc') ? 'DESC' : 'ASC';
            orderby_query = " ORDER BY " + orderby_field + " " + orderby;
        }
        return {orderby_query};
    }

    // single insert
    async insertQuery(req) {
        let query, params, result;
        query = req.db.query;
        params = req.db.params;
        const connection = await mysql.connection();
        try {
            result = await connection.query(query, params);
            console.log("Insert result");
            console.log(result);
            if(result && result.affectedRows === 1) {
                return req.response = {
                    responseCode: 200,
                    responseMessage: "Successfully done.",
                    responseData: result
                }
            }else{
                return req.response = {
                    responseCode: 0,
                    responseMessage: "Unable to insert data due to an error.",
                    responseData: result
                }
            }

        }catch (err) {
            return logger.dumpDBError(err);
            // throw err;
        }finally {
            await connection.release();
        }
    }

    // Multi insert
    async insertMultiQuery(req) {
        let query, params, where, result;
        query = req.db.query;
        params = req.db.params;
        const connection = await mysql.connection();
        try {
            result = await connection.query(query, [params]);
            if(result && result.affectedRows >= 1) {
                return req.response = {
                    responseCode: 200,
                    responseMessage: "Successfully done.",
                    responseData: result
                }
            }else{
                return req.response = {
                    responseCode: 0,
                    responseMessage: "Unable to insert multi data due to an error.",
                    responseData: result
                }
            }

        }catch (err) {
            return logger.dumpDBError(err);
            // throw err;
        }finally {
            await connection.release();
        }
    }

    // Multi insert with were condition
    async insertMultiWhereQuery(req) {
        let query, params, where, result;
        query = req.db.query;
        params = req.db.params;
        where = req.db.where;
        if(where)
            query += " "+where
        const connection = await mysql.connection();
        try {
            result = await connection.query(query, params);
            if(result && result.affectedRows >= 1) {
                return req.response = {
                    responseCode: 200,
                    responseMessage: "Successfully done.",
                    responseData: result
                }
            }else{
                return req.response = {
                    responseCode: 0,
                    responseMessage: "Unable to insert multi data due to an error.",
                    responseData: result
                }
            }

        }catch (err) {
            return logger.dumpDBError(err);
            // throw err;
        }finally {
            await connection.release();
        }
    }

    // single update
    async updateQuery(req) {
        let query, params, where, result;
        query = req.db.query;
        params = req.db.params;
        where = req.db.where;
        if(where)
            query += " "+where
        query += " LIMIT 1 ";
        const connection = await mysql.connection();
        try {
            result = await connection.query(query, params);
            if(result && result.changedRows === 1) {
                return req.response = {
                    responseCode: 200,
                    responseMessage: "Successfully done.",
                    responseData: result
                }
            }else{
                return req.response = {
                    responseCode: 0,
                    responseMessage: "Unable to update data due to an error.",
                    responseData: result
                }
            }

        }catch (err) {
            return logger.dumpDBError(err);
            // throw err;
        }finally {
            await connection.release();
        }
    }

    // multiple update
    async multipleUpdateQuery(req) {
        let query, params, where, result;
        query = req.db.query;
        params = req.db.params;
        where = req.db.where;
        if(where)
            query += " "+where
        const connection = await mysql.connection();
        try {
            result = await connection.query(query, params);
            if(result && result.changedRows >= 1) {
                return req.response = {
                    responseCode: 200,
                    responseMessage: "Successfully done.",
                    responseData: result
                }
            }else{
                return req.response = {
                    responseCode: 0,
                    responseMessage: "Unable to update data due to an error.",
                    responseData: result
                }
            }

        }catch (err) {
            return logger.dumpDBError(err);
            // throw err;
        }finally {
            await connection.release();
        }
    }
	
	// multiple document update
    async multipleDocumentUpdateQuery(req) {
        let query, params, where, result;
        query = req.db.query;
        params = req.db.params;
        where = req.db.where;
        if(where)
            query += " "+where
        const connection = await mysql.connection();
        try {
            result = await connection.query(query, params);
            if(result && result.changedRows >= 0) {
                return req.response = {
                    responseCode: 200,
                    responseMessage: "Successfully done.",
                    responseData: result
                }
            }else{
                return req.response = {
                    responseCode: 0,
                    responseMessage: "Unable to update data due to an error.",
                    responseData: result
                }
            }

        }catch (err) {
            return logger.dumpDBError(err);
            // throw err;
        }finally {
            await connection.release();
        }
    }

    // Find a multiple Entity
    async raqQuery(req) {
        let query, params, where, group_by, order_by, limit, result;
        query = req.db.query;
        params = req.db.params;
        where = req.db.where;
        group_by = req.db.group_by;
        order_by = req.db.order_by;
        limit = req.db.limit;
        if(where)
            query += " "+where
        if(group_by)
            query += " "+group_by
        if(order_by)
            query += " "+order_by
        if(limit)
            query += " "+limit
        const connection = await mysql.connection();
        try {
            result = await connection.query(query, params);

            if(result[0]) {
                if(result[0].total_count === 0){
                    return req.response = {
                        responseCode: 0,
                        responseMessage: "No Data Found.",
                        responseData: result
                    }
                }

                console.log("result:: ", result);
                return req.response = {
                    responseCode: 200,
                    responseMessage: "Successfully retrieved data.",
                    responseData: result
                }
            }else{
                return req.response = {
                    responseCode: 0,
                    responseMessage: "No Data Found.",
                    responseData: result
                }
            }

        }catch (err) {
            return logger.dumpDBError(err);
            // throw err;
        }finally {
            await connection.release();
        }
    }

    // Find a single Entity
    async raqQueryFindOne(req) {
        let query, params, where, limit, result;
        query = req.db.query;
        params = req.db.params;
        where = req.db.where;
        limit = " LIMIT 1";
        if(where)
            query += " "+where
        if(limit)
            query += limit;
        const connection = await mysql.connection();
        try {
            result = await connection.query(query, params);
            if(result[0]) {
                if(result[0].total_count === 0){
                    return req.response = {
                        responseCode: 0,
                        responseMessage: "No Data Found.",
                        responseData: null
                    }
                }
                return req.response = {
                    responseCode: 200,
                    responseMessage: "Successfully retrieved data.",
                    responseData: result[0]
                }
            }else{
                return req.response = {
                    responseCode: 0,
                    responseMessage: "No Data Found.",
                    responseData: null
                }
            }
        }catch (err) {
            return logger.dumpDBError(err);
            // throw err;
        }finally {
            await connection.release();
        }
    }

}

exports.MysqlQuery = MysqlQuery;