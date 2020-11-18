using {API_BUSINESS_PARTNER as external} from './external/API_BUSINESS_PARTNER.csn';

service AddressManagerService {

    @readonly
    entity BusinessPartners         as projection on external.A_BusinessPartner {
        BusinessPartner, LastName, FirstName, to_BusinessPartnerAddress
    };

    entity BusinessPartnerAddresses as projection on external.A_BusinessPartnerAddress {
        BusinessPartner, AddressID, Country, PostalCode, CityName, StreetName, HouseNumber
    }

};
