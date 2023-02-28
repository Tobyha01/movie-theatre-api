const {db} = require("../db")
const {check, validationResult} = require("express-validator")
const express = require("express")
const router = express.Router()
const {Show} = require("../models/User")

router.use(express.json())

module.exports = router