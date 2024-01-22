module.exports = (sequelize, DataTypes) => {
    const blogs_master = sequelize.define(
      "blogs",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          unique:true
        },
        idstr:{
          type:DataTypes.UUID,
          defaultValue:DataTypes.UUIDV4
        },
        title: {
          type: DataTypes.STRING,
          allowNull:false
        },
        body: {
          type: DataTypes.STRING,
        },
        deletedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        freezeTableName: true,
        timestamps: true,
      }
    );
    return blogs_master;
  };
  