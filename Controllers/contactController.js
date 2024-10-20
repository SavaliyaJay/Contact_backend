const asyncHandler = require("express-async-handler")
const contactSchema = require("../Models/contactModel")

//@desc get all contant
//@route GET /api/contact
//@access public
const getContact = asyncHandler(async (req, res, next) => {
    const contact = await contactSchema.find();
    if (!contact) {
        const error = new Error("Contact Not Found");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({ message: contact })
})

//@desc create contant
//@route POST /api/contact
//@access public
const createContact = asyncHandler(async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const contact = await contactSchema.create({ name, email, phone });
    if (!contact) {
        throw new Error('Somethind want to wrong.')
    }
    res.status(200).json({ data: req.body })
})


//@desc get single contant
//@route GET /api/contact/:id
//@access public
const getContactById = asyncHandler(async (req, res, next) => {
    const contact = await contactSchema.findById(req.params.id);
    if (!contact) {
        const error = new Error("Contact Not Found");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({ message: contact })
})


//@desc update single contant
//@route PUT /api/contact:id
//@access public
const putContact = asyncHandler(async (req, res, next) => {
    const contact = await contactSchema.findById(req.params.id);
    if (!contact) {
        const error = new Error("Contact Not Found");
        error.status = 404;
        return next(error);
    }
    const upadteContact = await contactSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
    )
    res.status(200).json({ message: upadteContact })
})


//@desc get all contant
//@route get /api/contact:id
//@access public
const deleteContact = asyncHandler(async (req, res, next) => {
    const contact = await contactSchema.findById(req.params.id);
    if (!contact) {
        const error = new Error("Contact Not Found");
        error.status = 404;
        return next(error);
    }
    const deleteContact = await contactSchema.findByIdAndDelete(
        req.params.id
    )
    res.status(200).json({ message: deleteContact })
})

module.exports = {
    getContact,
    getContactById,
    createContact,
    putContact,
    deleteContact
}
