const StatusEnum = Object.freeze({
    Active: 1,
    Inactive: 0
});

const ProductTypeEnum = Object.freeze({
    Single: 1,
    Variable: 2
});

const CurrencyTypeEnum = Object.freeze({
    INR: 1,
    USD : 2,
    EUR : 3,
    JPY  : 4,
    GBP : 5,
    CAD  : 6,
    AUD : 7,
    CNY  : 8,
    SGD : 9,
    AED : 10
});

const RoleTypeEnum = Object.freeze({
    Manager: 3,
    Clerk : 2,
    Employee : 1
});

const BloodGroupEnum = Object.freeze({
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-"
});

const getDropDownValuesFromEnum = (enumObj) => {
   return Object.entries(enumObj)
}

export { getDropDownValuesFromEnum,RoleTypeEnum, StatusEnum, ProductTypeEnum, CurrencyTypeEnum, BloodGroupEnum};
  