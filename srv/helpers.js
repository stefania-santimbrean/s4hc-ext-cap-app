const { BusinessPartnerAddress } = require("@sap/cloud-sdk-vdm-business-partner-service");

const _prepareBody = (address) => {
    return {
        businessPartner: address.BusinessPartner,
        country: address.Country,
        postalCode: address.PostalCode,
        cityName: address.CityName,
        streetName: address.StreetName,
        houseNumber: address.HouseNumber
    }
}

const buildAddressForCreate = (req) => {
    const address = BusinessPartnerAddress.builder().fromJson(_prepareBody(req.data));
    if (req.params[0]) {
        const { BusinessPartner } = req.params[0];
        address.businessPartner = BusinessPartner;
    }
    return address;
}

const buildAddressForUpdate = (req) => {
    const { BusinessPartner, AddressID } = req.params[0];
    const address = BusinessPartnerAddress.builder().fromJson(_prepareBody(req.data));
    address.businessPartner = BusinessPartner;
    address.addressId = AddressID;
    return address;
}

const prepareResult = (address) => {
    return {
        BusinessPartner: address.businessPartner,
        AddressID: address.addressId,
        Country: address.country,
        PostalCode: address.postalCode,
        CityName: address.cityName,
        StreetName: address.streetName,
        HouseNumber: address.houseNumber
    }
}


const constructBusinessPartnerFilter = (req) => {
    if (req && req.params && req.params[0]) {
        return {
            'BusinessPartner': req.params[0].BusinessPartner
        }
    } else if (req && req._.odataReq._queryOptions && req._.odataReq._queryOptions.$search) {
        const searchValue = JSON.parse(req._.odataReq._queryOptions.$search);
        return `BusinessPartner = ${searchValue} or FirstName = ${searchValue} or LastName = ${searchValue}`
    }
}

const constructBusinessPartnerAddressFilter = (req) => {
    if (req && req.params && req.params[0]) {
        return req.params[0].AddressID ? {
            'BusinessPartner': req.params[0].BusinessPartner,
            'AddressID': req.params[0].AddressID
        } : {
                'BusinessPartner': req.params[0].BusinessPartner
            }
    }
}

const buildQuery = (entity, columns, filter) => {
    if (filter) {
        return SELECT.from(entity)
            .columns(columns)
            .where(filter)
    } else {
        return SELECT.from(entity)
            .columns(columns)
    }
}

module.exports = {
    buildAddressForCreate,
    buildAddressForUpdate,
    prepareResult,
    constructBusinessPartnerAddressFilter,
    constructBusinessPartnerFilter,
    buildQuery
}