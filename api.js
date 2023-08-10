const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const router = express.Router();

const jsonParser = bodyParser.json();

const db = process.env.DB === 'LOCAL' ? new Sequelize(process.env.DB_LOCAL) : new Sequelize(process.env.DB_HOST);

const Guests = db.define(
  'Guests',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peopleCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    drinks: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    allergy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    children: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foods: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subAllergy: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: () => {
        const date = new Date();
        return date.toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
      },
    },
    updatedAt: {
      type: DataTypes.STRING,
      defaultValue: () => {
        const date = new Date();
        return date.toLocaleString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
      },
    },
  },
  {
    timestamps: false,
  },
);

router.post('/api/guest-add', jsonParser, async (req, res) => {
  try {
    const todo = await Guests.create(req.body);
    res.status(200).send(todo);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/api/guest-delete/:id', jsonParser, async (req, res) => {
  try {
    const { id } = req.params;
    await Guests.destroy({ where: { id } });
    res.status(200).sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/api/guest-all', jsonParser, async (req, res) => {
  try {
    const todo = await Guests.findAll();
    res.status(200).send(todo);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = { router, db };
