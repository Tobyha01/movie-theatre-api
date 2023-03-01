const {db} = require("../db")
const {check, validationResult} = require("express-validator")
const express = require("express")
const router = express.Router()
const {Show} = require("../models/index")

router.use(express.json())

router.get("/", async function(request, response) {
    try{
        const shows = await Show.findAll()
        response.status(200).send(shows)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.get("/:id", async function (request, response){
    try{
        const show = await Show.findByPk(request.params.id) 
        response.status(200).send(show)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.get("/genre/:genre", async function(request, response) {
    try{
        const shows = await Show.findAll({where: {genre: request.params.genre}})
        response.status(200).send(shows)
    }
    catch(error){
        response.send(500).send({error: error.message})
    }
})

router.put("/userId/:userId", async function(request, response) {
    try{
        const show = await Show.findOne({where: {userId: request.params.userId}})
        await show.update({rating: request.body.rating})
        response.status(200).send(show)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.put("/:id", async function(request, response) {
    try{
        const show = await Show.findByPk(request.params.id)
        show.update({status: request.body.status})
        response.status(200).send(show)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.delete("/:id", async function(request, response) {
    try{
        const show = await Show.destroy({where: {id: request.params.id}})
        response.status(200).send({show})
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

module.exports = router