const express = require('express')
const router = express.Router()
const Album = require('../models/album')



router.post('/add', async (req, res) => {

    try {
        const createdAlbum = await Album.create({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            prix: req.body.prix,



        })
        res.json(createdAlbum)
    } catch (error) {
        res.json({ message: error.message })
    }

   
})

router.get('/',async (req, res) => {
    const albums=await Album.find()
    res.json(albums)
})
router.get('/:id', async(req, res) => {

    const album = await Album.findById(req.params.id)
    if(album){
        res.json(album)
    }else{
        res.status(404).json({message:'album doesnt exist!'})
    }
    
})
router.put('/:id', async (req, res) => {
    //1.find user if he exists or not
    const album = await Album.findById(req.params.id)
    //if he exists:
    if (album) {
        album.name = req.body.name
        album.description = req.body.description
        album.prix = req.body.prix
        album.image = req.body.image
        await album.save()
        res.json(album)

    } else {

        res.status(404).json({ message: 'album doesnt exist!' })

    }


})
router.delete('/:id', async (req, res) => {
    const album = await Album.findById(req.params.id)
    if (album) {
        
        await Album.findByIdAndDelete(req.params.id)
        res.json({ message: 'album deleted successfully!' })
    } else {
        res.status(404).json({ message: 'album doesnt exist!' })
    }
})

module.exports = router