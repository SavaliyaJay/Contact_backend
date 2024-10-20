const express = require("express");
const router = express.Router();
const {
    getContact,
    createContact,
    getContactById,
    putContact,
    deleteContact
} = require("../Controllers/contactController")

// router.route("/").get((req, res) => {
//     res.status(201).json({ message: "Jay Savaliya" })
// })

router.route("/").get(getContact)
router.route("/").post(createContact)
router.route("/:id").get(getContactById)
router.route("/:id").put(putContact)
router.route("/:id").delete(deleteContact)


module.exports = router