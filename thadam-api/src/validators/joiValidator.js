import Joi from 'joi';

export function toProperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFormattedErrorMessage(error) {
    const formattedErrors = error.details.map(detail => 
        toProperCase(detail.message.replace(/"/g, ''))
    );

    return formattedErrors;
}

const addressValidationMessage = {
    'string.empty': `"Address" cannot be empty`,
    'string.min': `"Address" should have at least 3 characters`,
    'string.max': `"Address" should not exceed 100 characters`,
    'any.required': `"Address" is required`
};

export const customerSchema = Joi.object({
    customerId: Joi.string().min(3).max(5).required(),
    name: Joi.string().min(3).max(50).required(),
    primaryContactNumber: Joi.string().required(),
    secondaryContactNumber: Joi.string().allow('', null).optional(),
    address: Joi.string().required().min(3).max(100).messages(addressValidationMessage),
    status: Joi.number().required(),
});

export const companySchema = Joi.object({
    name: Joi.string().min(3).max(5).required(),
    businessType: Joi.string().min(3).max(50).required(),
    industryType: Joi.string().required(),
    address: Joi.string().required().min(3).max(100).messages(addressValidationMessage),
    status: Joi.number().required(),
    licenseNumber: Joi.string().min(3).max(20).required(),
    gstNumber: Joi.string().min(3).max(20).required(),
    fssaiNumber: Joi.string().min(3).max(20).required(),
    currency: Joi.string().min(3).max(20).required(),
    branches: Joi.array().allow('', null).optional(),
});

export const userSchema = Joi.object({
    userId: Joi.string().min(3).max(5).required(),
    name: Joi.string().min(3).max(50).required(),
    role: Joi.number().required(),
    contactNumber: Joi.string().allow('', null).optional(),
    bloodGroup: Joi.string().min(2).max(5).required(),
    address: Joi.string().required().min(3).max(100).messages(addressValidationMessage),
    joinedDate: Joi.string().required(),
    relievedDate: Joi.string().allow('', null).optional(),
    status: Joi.number().required(),
    assignedBranch: Joi.string().required(),
    emergencyContactPerson: Joi.string().required(),
    emergencyContactNumber: Joi.string().required(),
    relationShip: Joi.string().required()
});