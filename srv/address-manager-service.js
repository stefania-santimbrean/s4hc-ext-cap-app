const cds = require('@sap/cds');

const { BusinessPartnerAddress } = require("@sap/cloud-sdk-vdm-business-partner-service");
const sdkDest = { "destinationName": 's4hc_simple' };
const {
    buildAddressForCreate,
    buildAddressForUpdate,
    prepareResult
} = require('./helpers')

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
    //GET http://localhost:4004/address-manager/BusinessPartners('1000000')
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
                let searchQuery = req._.odataReq._queryOptions;
                if ((searchQuery) && (searchQuery.$search)) {
                    let searchValue = JSON.parse(searchQuery.$search);
                    result = await tx.emit({
                        query: SELECT.from(entity)
                            .columns(columnsToSelect)
                            .where(`BusinessPartner =`, searchValue,
                                `or FirstName =`, searchValue,
                                `or LastName =`, searchValue)
                    })
                } else {
                    //if no parameter and no search query, we read all Business Partners
                    result = await tx.run(
                        SELECT.from(entity)
                            .columns(columnsToSelect)
                    )
                }
            }

            return result;

        } catch (err) {
            req.reject(err);
        }
    });

    //this event handler is triggered when we call
    //GET http://localhost:4004/address-manager/BusinessPartnerAddresses
    //GET http://localhost:4004/address-manager/BusinessPartnerAddresses(BusinessPartner='10300001',AddressID='24642')
    //GET http://localhost:4004/address-manager/BusinessPartners('1000000')/to_BusinessPartnerAddress
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
                if (addressId) {
                    //select one BusinessPartnerAddress
                    result = await tx.run(
                        SELECT.from(entity)
                            .columns(columnsToSelect)
                            .where({
                                'BusinessPartner': businessPartner,
                                'AddressID': addressId
                            })
                    )
                } else {
                    //select all the BusinessPartnerAddresses for this BusinessPartner
                    result = await tx.run(
                        SELECT.from(entity)
                            .columns(columnsToSelect)
                            .where({
                                'BusinessPartner': businessPartner
                            })
                    )
                }
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

    //this event handler is triggered when we call
    //POST http://localhost:4004/address-manager/BusinessPartnerAddresses
    /*
    Request body sample:
    {
    "BusinessPartner": "10300001",
    "CityName": "string",
    "Country": "DE",
    "HouseNumber": "string",
    "PostalCode": "12345",
    "StreetName": "string"
    }
    */
    this.on('CREATE', BusinessPartnerAddresses, async (req) => {
        try {
            const address = buildAddressForCreate(req);
            const result = await BusinessPartnerAddress
                .requestBuilder()
                .create(address)
                .execute(sdkDest);
            return prepareResult(result);
        } catch (err) {
            req.reject(err);
        }
    });

    //this event handler is triggered when we call
    //PUT http://localhost:4004/address-manager/BusinessPartnerAddresses
    /*
    Request body sample:
    {
    "CityName": "string",
    "Country": "DE",
    "HouseNumber": "string",
    "PostalCode": "12345",
    "StreetName": "string"
    }
    */
    this.on('UPDATE', BusinessPartnerAddresses, async (req) => {
        try {
            const address = buildAddressForUpdate(req);
            const result = await BusinessPartnerAddress
                .requestBuilder()
                .update(address)
                .execute(sdkDest);
            return prepareResult(result);
        } catch (err) {
            req.reject(err);
        }
    });

    //this event handler is triggered when we call
    //DELETE http://localhost:4004/address-manager/BusinessPartnerAddresses
    this.on('DELETE', BusinessPartnerAddresses, async (req) => {
        try {
            const { BusinessPartner, AddressID } = req.params[0];
            await BusinessPartnerAddress
                .requestBuilder()
                .delete(BusinessPartner, AddressID)
                .execute(sdkDest);
        } catch (err) {
            req.reject(err);
        }
    });

});
