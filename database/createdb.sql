create table provider
(
    name char(100) not null,
    abbr char(3)   not null,
    primary key (name, abbr)
);

create table chargestoproviders
(
    amount           float     null,
    status           char(100) null,
    startDate        timestamp null,
    endDate          timestamp null,
    transactionID    char(50)  null,
    toProviderAbbr   int(10)   not null,
    fromProviderAbbr int(10)   not null,
    Providername     char(100) not null,
    Providername2    char(100) not null,
    Providerabbr     char(3)   not null,
    Providerabbr2    char(3)   not null,
    primary key (toProviderAbbr, fromProviderAbbr),
    constraint provider_to
        foreign key (Providername, Providerabbr) references provider (name, abbr),
    constraint provider_from
        foreign key (Providername2, Providerabbr2) references provider (name, abbr)
);

create table stations
(
    stationID    char(5)   not null
        primary key,
    stationName  char(100) null,
    Providername char(100) not null,
    Providerabbr char(3)   not null,
    constraint station_belongs
        foreign key (Providername, Providerabbr) references provider (name, abbr)
);

create table tag
(
    tagID        char(10)  not null
        primary key,
    Providerabbr char(3)   not null,
    tagProvider  char(100) not null,
    constraint tag_belongs
        foreign key (tagProvider, Providerabbr) references provider (name, abbr)
);

create table users
(
    Providername char(100) not null,
    username     char(20)  null,
    password     char(30)  null,
    userID       int(10)   null,
    email        char(255) null,
    Providerabbr char(3)   not null,
    constraint providername_providerabbr
        foreign key (Providername, Providerabbr) references provider (name, abbr)
);

create table vehicles
(
    vehicleID   char(15) not null
        primary key,
    licenseYear int(4)   null,
    tagtagID    char(10) not null,
    constraint vehicle_to_tag
        foreign key (tagtagID) references tag (tagID)
);

create table passes
(
    VehiclesvehicleID char(15) not null,
    StationsstationID char(5)  not null,
    passID            char(20) not null,
    timestamp         datetime null,
    charge            float    null,
    primary key (VehiclesvehicleID, StationsstationID, passID),
    constraint stationid_to_stationid
        foreign key (StationsstationID) references stations (stationID),
    constraint vehicleid_to_vehicle_id
        foreign key (VehiclesvehicleID) references vehicles (vehicleID)
);

