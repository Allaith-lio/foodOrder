// Central field definitions for every dynamic form in the app.
// Each object key is the field name; `rule` points to a validator in
// utils/validators.js (defaults to the field name) and `optional` marks
// fields that may be left empty. Render them with <FormFields /> and
// validate them with useForm / checkForm (both iterate Object.keys).

export const loginFields = {
  email: {
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    icon: "mail",
    rule: "email",
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    icon: "lock",
    rule: "password",
    minLength: 8,
  },
};

export const registerFields = {
  avatar: {
    label: "Profile photo",
    type: "file",
    accept: "image/*",
    optional: true,
  },
  username: {
    label: "Username",
    type: "text",
    placeholder: "How should we call you?",
    autoComplete: "username",
    icon: "user",
    rule: "username",
  },
  email: {
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    icon: "mail",
    rule: "email",
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "new-password",
    icon: "lock",
    rule: "password",
    minLength: 8,
  },
};

export const checkoutFields = {
  streetAddress: {
    label: "Street Address",
    placeholder: "742 Evergreen Terrace, Apt 4B, Springfield, OR",
    icon: "search",
    rule: "address",
  },
  aptFloor: {
    label: "Apt / Floor / Gate Code",
    placeholder: "Apt 4B / Call #402",
    optional: true,
  },
  deliveryNotes: {
    label: "Delivery Notes for Courier",
    placeholder: "Leave at door, ring bell",
    icon: "alignLeft",
    optional: true,
  },
  phone: {
    label: "Phone Number",
    type: "tel",
    inputMode: "tel",
    placeholder: "09XXXXXXXX",
    icon: "phone",
    rule: "phone",
  },
};

export const locationFields = {
  area: {
    label: "Area / Neighborhood",
    placeholder: "e.g. Raml Al Shamali",
    icon: "mapPin",
    rule: "city",
  },
  street: {
    label: "Street / Building",
    placeholder: "Street name or building number",
    icon: "home",
    rule: "address",
  },
  details: {
    label: "Additional Details",
    placeholder: "Floor, apartment, nearby landmark...",
    icon: "alignLeft",
    optional: true,
  },
};
