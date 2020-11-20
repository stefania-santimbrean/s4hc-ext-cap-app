annotate AddressManagerService.BusinessPartners with @title : 'Business Partners' {
    BusinessPartner @title                                  : 'Business Partner';
    LastName        @title                                  : 'Last Name';
    FirstName       @title                                  : 'First Name';
};

annotate AddressManagerService.BusinessPartners with @(UI : {

    HeaderInfo : {
        TypeName       : 'Business Partner',
        TypeNamePlural : 'Business Partners',
        Title          : {Value : BusinessPartner},
        Description    : {Value : FirstName}

    },
    LineItem   : [
    {
        Value : BusinessPartner,
        Label : 'Business Partner'
    },
    {
        Value : LastName,
        Label : 'Last Name'
    },
    {
        Value : FirstName,
        Label : 'First Name'
    }
    ],
    Facets     : [{
        $Type  : 'UI.ReferenceFacet',
        Target : 'to_BusinessPartnerAddress/@UI.LineItem',
        Label  : 'Business Partner Addresses'
    }]

});

annotate AddressManagerService.BusinessPartnerAddresses with @(
    Capabilities : {InsertRestrictions : {Insertable : false}},
    UI           : {

        HeaderInfo          : {
            TypeName       : 'Business Partner Address',
            TypeNamePlural : 'Business Partner Addresses',
            Title          : {Value : AddressID}
        },

        LineItem            : [
        {
            Value : AddressID,
            Label : 'Address ID'
        },
        {
            Value : Country,
            Label : 'Country'
        },
        {
            Value : PostalCode,
            Label : 'Postal Code'
        },
        {
            Value : CityName,
            Label : 'City Name'
        },
        {
            Value : StreetName,
            Label : 'Street Name'
        },
        {
            Value : HouseNumber,
            Label : 'House Number'
        }
        ],
        Facets              : [{
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#Address',
            Label  : 'Address'
        }],
        FieldGroup #Address : {Data : [
        {
            Value : Country,
            Label : 'Country'
        },
        {
            Value : PostalCode,
            Label : 'Postal Code'
        },
        {
            Value : CityName,
            Label : 'City Name'
        },
        {
            Value : StreetName,
            Label : 'Street Name'
        },
        {
            Value : HouseNumber,
            Label : 'House Number'
        }
        ]}
    }
);
