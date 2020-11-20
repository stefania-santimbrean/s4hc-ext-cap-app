annotate AddressManagerService.BusinessPartners with @title : 'Business Partners' {
    BusinessPartner @title                                  : 'Business Partner';
    LastName        @title                                  : 'Last Name';
    FirstName       @title                                  : 'First Name';
};

annotate AddressManagerService.BusinessPartners with @(UI : {

    HeaderInfo : {
        TypeName       : 'Business Partner',
        TypeNamePlural : 'Business Partners'
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
});
