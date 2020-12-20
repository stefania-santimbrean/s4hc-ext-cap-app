const cds = require('@sap/cds');

const { BusinessPartnerAddress } = require("@sap/cloud-sdk-vdm-business-partner-service");
const sdkDest = { "destinationName": 's4hc_simple' };
const {
    buildAddressForCreate,
    buildAddressForUpdate,
    prepareResult,
    constructBusinessPartnerAddressFilter,
    constructBusinessPartnerFilter,
    buildQuery
} = require('./helpers')

const { ENTITIES } = require('./constants');

//here is the service implementation
//here are the service handlers
module.exports = cds.service.impl(async function () {

    //these are the entities from address-manager-service.cds file
    const { BusinessPartners, BusinessPartnerAddresses } = this.entities;

    //cds will connect to the external service API_BUSINESS_PARTNER
    //which is declared in package.json in the cds requires section
    const service = await cds.connect.to('API_BUSINESS_PARTNER');

    const _buildHandler = async (entityName, req, filterFunction) => {
        try {
            const { name: entity, columns } = ENTITIES[entityName];
            const filter = filterFunction(req);
            const query = buildQuery(entity, columns, filter);

            return await service.transaction().emit({
                query: query,
                headers: {
                    "APIKey": "8JLQURhRAeEH8OHgXFTXcfmW6H0vrW5V"
                }
            })

        } catch (err) {
            req.reject(err);
        }
    }

    //this event handler is triggered when we call
    //GET http://localhost:4004/address-manager/BusinessPartners
    //GET http://localhost:4004/address-manager/BusinessPartners('1000000')
    this.on('READ', BusinessPartners, async (req) => {
        return await _buildHandler('BusinessPartner', req, constructBusinessPartnerFilter);
    });

    //this event handler is triggered when we call
    //GET http://localhost:4004/address-manager/BusinessPartnerAddresses
    //GET http://localhost:4004/address-manager/BusinessPartnerAddresses(BusinessPartner='10300001',AddressID='24642')
    //GET http://localhost:4004/address-manager/BusinessPartners('1000000')/to_BusinessPartnerAddress
    this.on('READ', BusinessPartnerAddresses, async (req) => {
        return await _buildHandler('BusinessPartnerAddress', req, constructBusinessPartnerAddressFilter);
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
