const express = require("express");
const router = express.Router();
const {
    getContact,
    createContact,
    getContactById,
    putContact,
    deleteContact,
    createBulkContact,
    checkDuplicate,
    deleteBulkContact
} = require("../Controllers/contactController")

// router.route("/").get((req, res) => {
//     res.status(201).json({ message: "Jay Savaliya" })
// })

router.route("/").get(getContact)
router.route("/").post(createContact)
router.route("/bulkUpload").post(createBulkContact)
router.route("/checkDuplicate").get(checkDuplicate);
router.route("/:id").get(getContactById)
router.route("/:id").put(putContact)
router.route("/:id").delete(deleteContact)
router.route("/bulkDelete").post(deleteBulkContact)


module.exports = router