const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//If we declare address this way when we display the employee details address shows up in the order of the employee schema....if not address shows up first then other employee details
const addressSchema = new mongoose.Schema(
    {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: String, required: true}
    }
)

const employee = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        job_title: { type: String, required: true },
        address: addressSchema
    },
    { timestamp: true },
);

module.exports = mongoose.model('employees', employee);