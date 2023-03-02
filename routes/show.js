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

router.put("/:id/watched", [check("rating").trim().not().isEmpty().withMessage("Rating cannot be empty!")], async function(request, response) {
    try{
        const errors = validationResult(request)
        const shows = await Show.findAll({where: {userId: true}})
        const show = shows[request.params.id -1]
        if(!errors.isEmpty()){
            response.status(400).send(errors)
        }
        else{
            await show.update({rating: request.body.rating})
            response.status(200).send(show)
        }
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.put("/:id/updates", [check("status").trim().isLength({min: 5, max: 25}).withMessage("Status character length must be between 5 and 25")], async function(request, response) {
    try{
        const shows = await Show.findAll()
        const show = shows[request.params.id -1]
        const errors = validationResult(request)
        if(!errors.isEmpty()){
            response.status(400).send(errors)
        }
        else{
/*             if(show.status === "on-going"){
                await show.update({status: "cancelled"})
            }
            
            else{
                await show.update({status: "on-going"})
            }     */
            
            await show.update({status: request.body.status})
            response.status(200).send(show)
        }
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