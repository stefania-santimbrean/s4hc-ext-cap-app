const cds = require('@sap/cds');

//here is the service implementation
//here are the service handlers
module.exports = cds.service.impl(async function () {

    //these are the entities from address-manager-service.cds file
    const { BusinessPartners, BusinessPartnerAddresses } = this.entities;

    //cds will connect to the external service API_BUSINESS_PARTNER
    //which is declared in package.json in the cds requires section
    const service = await cds.connect.to('API_BUSINESS_PARTNER');

    //this event handler is triggered when we call
    //GET http://localhost:4004/address-manager/BusinessPartners
    this.on('READ', BusinessPartners, async (req) => {
        try {
            const tx = service.transaction();
            let result = {};
            //entity name as it is in the .csn file for the service API_BUSINESS_PARTNER
            let entity = 'A_BusinessPartner';
            //columns which we have declared in cds entity that we want to expose
            let columnsToSelect = ["BusinessPartner", "FirstName", "LastName"];

            //if there is a parameter
            if (req.params[0]) {
                //If you look in the .csn file you will see that
                //the key for our BusinessPartner entity is BusinessPartner column
                const businessPartner = req.params[0].BusinessPartner;
                result = await tx.run(
                    SELECT.from(entity)
                        .columns(columnsToSelect)
                        .where({ 'BusinessPartner': businessPartner })
                )
            } else {
                //if no parameter, we read all Business Partners
                result = await tx.run(
                    SELECT.from(entity)
                        .columns(columnsToSelect)
                )
            }

            return result;

        } catch (err) {
            req.reject(err);
        }
    });

    //this event handler is triggered when we call
    //GET http://localhost:4004/address-manager/BusinessPartnerAddresses
    this.on('READ', BusinessPartnerAddresses, async (req) => {
        try {
            const tx = service.transaction();
            let result = {};
            //entity name as it is in the .csn file for the service API_BUSINESS_PARTNER
            let entity = 'A_BusinessPartnerAddress';
            //columns which we have declared in cds entity that we want to expose
            let columnsToSelect = ["BusinessPartner", "AddressID", "Country", "PostalCode", "CityName", "StreetName", "HouseNumber"];

            //if there is parameter
            if (req.params[0]) {
                //If you look in the .csn file you will see that
                //the keys for our BusinessPartnerAddress entity are
                //BusinessPartner and AddressID columns
                const businessPartner = req.params[0].BusinessPartner;
                const addressId = req.params[0].AddressID;
                result = await tx.run(
                    SELECT.from(entity)
                        .columns(columnsToSelect)
                        .where({
                            'BusinessPartner': businessPartner,
                            'AddressID': addressId
                        })
                )
            } else {
                //if no parameter, we read all Business Partner Addresses
                result = await tx.run(
                    SELECT.from(entity)
                        .columns(columnsToSelect)
                )
            }

            return result;
        } catch (err) {
            req.reject(err);
        }
    });

});
