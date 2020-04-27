const router = require('express').Router()
const Device = require('../../models/devices/DevicesModel')

// // like 
// router.post('/:deviceId/like', async(req, res) => {
//     try {
//         if(!req.body.like) {
//             throw new Error('Bad request')
//         }
//         // find device
//         let device = await Device.findById(req.params.deviceId)
//         if(!device) {
//             throw new Error('Device not found')
//         }

//         // update likes
//         let updatedLikes = device.likes + 1
//         Device.findByIdAndUpdate(req.params.deviceId,{likes: updatedLikes})
//         res.json({
//             success: true,
//             message: 'liked',
//             likes: updatedLikes
//         })
//     } catch (error) {
//         res.json({
//             error: error.message
//         })
//     }
// })

// dislike 
router.post('/:deviceId/dislike', async(req, res) => {
    try {
        if(!req.body.dislike) {
            throw new Error('Bad request')
        }
        // find device
        let device = await Device.findById(req.params.id)
        if(!device) {
            throw new Error('Device not found')
        }

        // update dislikes
        updatedDislikes = device.dislikes + 1
        Device.findByIdAndUpdate(req.params.deviceId,{likes: updatedDislikes})
        
        res.json({
            success: true,
            message: disliked,
            likes: updatedDislikes
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
        if(!req.body.dislike) {
            throw new Error('Bad request')
        }
        // find device
        let device = await Device.findById(req.params.id)
        if(!device) {
            throw new Error('Device not found')
        }

        // update dislikes
        let updatedDislikes = device.dislikes - 1
        Device.findByIdAndUpdate(req.params.deviceId,{likes: updatedDislikes})
        
        res.json({
            success: true,
            message: 'removed dislike',
            likes: updatedDislikes
        })
    } catch (error) {
        res.json({
            error: error.message
        })
    }
})

// export router
module.exports = router