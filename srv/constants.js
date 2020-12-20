module.exports.ENTITIES = {
    BusinessPartner: {
        name: 'A_BusinessPartner',
        columns: ['BusinessPartner', 'FirstName', 'LastName']
    },
    BusinessPartnerAddress: {
        name: 'A_BusinessPartnerAddress',
        columns: ['BusinessPartner', 'AddressID', 'Country', 'PostalCode', 'CityName', 'StreetName', 'HouseNumber']
    }
}