const db = require('../model');
const sequelize = db.sequelize;
const { QueryTypes, Utils } = require("sequelize");
const blogs_master = db.blogs_master;

exports.getRows = async (whereCondition) => {
    try {
        return await blogs_master.findAll({
            where: whereCondition,
            raw: true,
        });
    } catch (error) {
        throw error;
    }
};

exports.createRow = async () => {
    try {
        return await blogs_master.create({
            where: whereCondition,
            raw: true,
        });
    } catch (error) {
        throw error;
    }
}