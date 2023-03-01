const {db} = require("../db")
const {check, validationResult} = require("express-validator")
const express = require("express")
const router = express.Router()
const {User, Show} = require("../models/index")

router.use(express.json())

router.get("/", async function(request, response) {
    try{
        
        response.status(200).send(await User.findAll())
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.get("/:id", async function(request, response) {
    try{
        const user = await User.findByPk(request.params.id)
        response.status(200).send({user})
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.get("/shows/:id", async function(request, response) {
    try{
        const userShow = await Show.findAll({where: {userId: request.params.id}})
        response.status(200).send(userShow)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.put("/:id", async function(request, response) {
    try{
        const user = await User.findByPk(request.params.id)
        user.addShows([1, 5, 9])   
        response.status(200).send(user)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

module.exports = router