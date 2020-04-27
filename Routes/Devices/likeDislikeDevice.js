const router = require('express').Router()
const Device = require('../../models/devices/DevicesModel')

// dislike 
router.post('/:deviceId/dislike', async(req, res) => {
    try {
        // find device
        let device = await Device.findById(req.params.deviceId)
        if(!device) {
            throw new Error('Device not found')
        }

        // update dislikes
        updatedDislikes = device.dislikes + 1
        device.dislikes = updatedDislikes
        await device.save()
        
        res.json({
            success: true,
            message: 'disliked',
            dislikes: updatedDislikes
        })
    } catch (error) {
        res.json({
            error: error.message
        })
    }
})

// remove dislike - when a user "unclicks" the dislike button
router.post('/:deviceId/remove-dislike', async(req, res) => {
    try {
        // find device
        let device = await Device.findById(req.params.deviceId)
        if(!device) {
            throw new Error('Device not found')
        }

        // update dislikes
        if(device.dislikes<=0) { // shouldn't decrement dislikes if dislikes are zero or below zero
            throw new Error('There are no dislikes to remove')
        }
        let updatedDislikes = device.dislikes - 1
        device.dislikes = updatedDislikes
        await device.save()        
        res.json({
            success: true,
            message: 'removed dislike',
            dislikes: updatedDislikes
        })
    } catch (error) {
        res.json({
            error: error.message
        })
    }
})

// export router
module.exports = router