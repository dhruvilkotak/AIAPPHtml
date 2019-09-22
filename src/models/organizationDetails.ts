import { AddressFormat } from "./addressFormat";

export class OrganizationDetails{

    organizationDetailsUID:string="Organization UID";
    isSchool:boolean = true;
    schoolName:string="school name";
    schoolCode:string="school code";
    addressDetails:AddressFormat= new AddressFormat();
    organizationContactNumber:string="contact number";

}