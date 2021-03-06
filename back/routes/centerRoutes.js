const Center = require("../models/Center");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

/* add Center */
router.post("/add/", async (req, res) => {
    const newCenter = new Center({
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
  
    });
    try {
        const savedCenter = await newCenter.save();
        res.status(200).json(savedCenter);
    } catch (err) {
        res.status(500).json(err)
    }
});
/* update Center */
router.put("edit/:id", async (req, res) => {

    try {
        const updatedCenter = await Center.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedCenter);
    } catch (err) {
        res.status(500).json(err);
    }
})
/* DELTE Center */
router.delete("delete/:id", async (req, res) => {
    try {
        await Center.findByIdAndDelete(req.params.id)
        res.status(200).json('Center has been deleted...')
    } catch (err) {
        res.status(500).json(err)
    }
});
/* GET Center By ID */

router.get("/find/:id", async (req, res) => {
    try {
        const center = await Center.findById(req.params.id);
        const { password, ...others } = center._doc;

        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
});
/* GET All Center */

router.get("/", async (req, res) => {
    try {
        const Centers = await Center.find()
        res.status(200).json(Centers);
    } catch (err) {
        res.status(500).json(err)
    }
});
module.exports = router