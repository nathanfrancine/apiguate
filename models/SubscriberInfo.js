const SchemaObject = require('schema-object');

var SubscriberInfo = new SchemaObject({
    annex: String,
    product: String,
    billingCycle: String,
    voicePlanName: String,
    name: String,
    activationDate: Date,
    creditLimit: Number,
    customerType: String,
    customerRating: String
});
module.exports = SubscriberInfo;
