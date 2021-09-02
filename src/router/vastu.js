const express = require('express')
const Vastu = require('../models/vastuscore')
const router = new express.Router()

//===========Get room list=====================//
router.get('/vastu/getRoomList', async (req, res) => {

    try {
        const roomList = await Vastu.distinct('room')

        if (!roomList || roomList.length == 0) {
            return res.status(404).json({
                status: "fail",
                message: "data not found"
            })
        }
        res.status(200).json({
            status: "SUCCESS",
            statusCode: 200,
            message: "",
            payload: {
                roomList
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e
        })

    }

})

//==========Get room details==============//
router.post('/vastuCheck/getRoomDetails', async (req, res) => {
    const roomName = req.body.roomName
    console.log(roomName)
    try {
        // const data = await Vastu.find({ room: roomName })
        const data = await Vastu.aggregate([
            {
                $match: {
                    room: roomName
                }

            }, {
                $project: {
                    "direction": 1,
                    "room": 1,
                    "appScore": 1,
                    "category": {

                        $cond: {
                            "if": {
                                $lte: ["$appScore", 5]
                            }
                            , then: 'unfavourableDirections',
                            else: {
                                $cond: {
                                    "if": {
                                        $lte: ["$appScore", 9]
                                    }
                                    , then: 'neutralDirections',
                                    else: "favourableDirections"

                                }
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    "data": {
                        $push: "$direction"
                        // $push: "$room"

                    }
                }

            }

        ])
            .catch(er => {
                console.log("data ", data)
            })
        console.log("data ", data)
        if (!data || data.length == 0) {
            return res.status(404).json({
                status: "fail",
                message: e
            })
        }

        let obj = data.map(x => ({ [x._id]: x.data }));

        res.status(200).json({
            status: "SUCCESS",
            statusCode: 200,
            message: "",
            payload: {
                "data": obj
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e
        })

    }
})

//==========Get direction details==============//
router.post('/vastuCheck/getDirectionDetails', async (req, res) => {
    const direction = req.body.direction
    console.log(direction)
    try {
        const data = await Vastu.find({ direction: direction, appScore: 10 })
        console.log("data ", data)
        if (!data || data.length == 0) {
            return res.status(404).json({
                status: "fail",
                message: e
            })
        }

        let obj = { favourableDirections: [] }
        data.map(x => (obj.favourableDirections.push(x.room)));
        res.status(200).json({
            status: "SUCCESS",
            statusCode: 200,
            message: "",
            payload: {
                "data": obj
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e
        })

    }
})

module.exports = router