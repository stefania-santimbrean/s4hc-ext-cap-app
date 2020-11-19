const { BusinessPartnerAddress } = require("@sap/cloud-sdk-vdm-business-partner-service");

function prepareBody(address) {
    return {
        businessPartner: address.BusinessPartner,
        country: address.Country,
        postalCode: address.PostalCode,
        cityName: address.CityName,
        streetName: address.StreetName,
        houseNumber: address.HouseNumber
    }
}

function buildAddressForCreate(req) {
    const address = BusinessPartnerAddress.builder().fromJson(prepareBody(req.data));
    if (req.params[0]) {
        const { BusinessPartner } = req.params[0];
        address.businessPartner = BusinessPartner;
    }
    return address;
}

function buildAddressForUpdate(req) {
    const { BusinessPartner, AddressID } = req.params[0];
    const address = BusinessPartnerAddress.builder().fromJson(prepareBody(req.data));
    address.businessPartner = BusinessPartner;
    address.addressId = AddressID;
    return address;
}

function prepareResult(address) {
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

module.exports = {
    buildAddressForCreate,
    buildAddressForUpdate,
    prepareResult
}