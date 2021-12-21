

ALTER TABLE passes DROP FOREIGN KEY vehicleid_to_vehicle_id;
ALTER TABLE passes DROP FOREIGN KEY stationid_to_stationid;

truncate TABLE vehicles;
# insert here
ALTER TABLE passes ADD CONSTRAINT stationid_to_stationid foreign key (StationsstationID) references stations (stationID);
ALTER TABLE passes ADD constraint vehicleid_to_vehicle_id foreign key (VehiclesvehicleID) references vehicles (vehicleID);



#-------------------------------------------------------------------------------------------

ALTER TABLE passes DROP FOREIGN KEY vehicleid_to_vehicle_id;
ALTER TABLE passes DROP FOREIGN KEY stationid_to_stationid;

truncate TABLE stations;
# insert here
ALTER TABLE passes ADD CONSTRAINT stationid_to_stationid foreign key (StationsstationID) references stations (stationID);
ALTER TABLE passes ADD constraint vehicleid_to_vehicle_id foreign key (VehiclesvehicleID) references vehicles (vehicleID);