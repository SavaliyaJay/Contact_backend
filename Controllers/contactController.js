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

const checkDuplicate = asyncHandler(async (req, res, next) => {
    const duplicates = await contactSchema.aggregate([
        {
            $group: {
                _id: {
                    email: "$email",
                    phone: "$phone"
                },
                contacts: {
                    $push: {
                        id: "$_id",
                        name: "$name",
                        email: "$email",
                        phone: "$phone"
                    }
                },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { $gt: 1 }  // Only groups with more than 1 contact (i.e., duplicates)
            }
        },
        {
            $project: {
                _id: 0,
                duplicates: "$contacts"  // Return only the merged duplicate contacts
            }
        }
    ]);
    
    if (duplicates.length === 0) {
        return res.status(200).json({ message: "No duplicates found" });
    }
    
    res.status(200).json(duplicates);
    
    
    // const contact = await contactSchema.find();
    // if (!contact) {
    //     const error = new Error("Contact Not Found");
    //     error.status = 404;
    //     return next(error);
    // }
    // res.status(200).json({ message: contact })
});

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

const createBulkContact = asyncHandler(async (req, res, next) => {
    const contact = await contactSchema.insertMany(req.body);

    if (!contact) {
        throw new Error('Somethind want to wrong.')
    }
    res.status(200).json({ data: req.body })
});


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
const deleteBulkContact = asyncHandler(async (req, res, next) => {
    const contactIds = req.body; // Expecting req.body to be an array of IDs

    // Check if contactIds is an array and not empty
    if (!Array.isArray(contactIds) || contactIds.length === 0) {
        return res.status(400).json({ message: 'Invalid input. Provide an array of contact IDs.' });
    }

    // Use deleteMany with the appropriate filter
    const result = await contactSchema.deleteMany({ _id: { $in: contactIds } });

    if (result.deletedCount === 0) {
        throw new Error('No contacts were deleted.');
    }

    res.status(200).json({ message: `${result.deletedCount} contacts deleted successfully.` });
});

module.exports = {
    getContact,
    getContactById,
    createContact,
    checkDuplicate,
    createBulkContact,
    putContact,
    deleteContact,
    deleteBulkContact
}
