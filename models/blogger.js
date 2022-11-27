const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect");


const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true,
            notEmpty:true
            
        }
    },
    passwordHash: {
        type: DataTypes.STRING,
        field: 'password_hash',
        allowNull: false,
        validate:{
            notEmpty:true
        }
       
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    },
    {
        sequelize,
        modelName: 'user',
        timestamps: true,
        freezeTableName: true
        
    }
);
const Post = sequelize.define('Post',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty:true,
           
        }
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty:true
        }
    },
    isHidden: {
        type: DataTypes.BOOLEAN,
        field: 'is_hidden',
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
        defaultValue: DataTypes.NOW
    }},
    {
        sequelize,
        modelName: 'post',
        timestamps: true,
        freezeTableName: true
});


User.hasMany(Post);
Post.belongsTo(User);
module.exports = {User,Post}; 