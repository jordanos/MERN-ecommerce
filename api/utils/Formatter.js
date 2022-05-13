/* eslint-disable max-classes-per-file */
const ImplementationError = require('./ImplemetaionError');

class BasefFormatter {
  constructor(regxFormat) {
    this.regxFormat = regxFormat;
  }

  static exec() {
    throw new ImplementationError();
  }
}

exports.FormatPhone = class FormatPhone extends BasefFormatter {
  constructor() {
    super(/^251[0-9]{9}$/);
  }

  static formatPhone(phone) {
    // formats if phone input is like 0912345678
    if (/^0[0-9]{9}$/.test(phone)) {
      return `251${phone.substr(1, phone.length)}`;
    }
    // if phone is like 912345678
    if (/^[0-9]{9}$/.test(phone)) {
      return `251${phone}`;
    }
    // if phone is like 251912345678
    if (/^251[0-9]{9}$/.test(phone)) {
      return phone;
    }
    // if phone is like +251912345678
    if (/^\+251[0-9]{9}$/.test(phone)) {
      return `${phone.substr(1, phone.length)}`;
    }
    return phone;
  }

  exec(phone) {
    const formattedPhone = FormatPhone.formatPhone(phone);

    if (this.regxFormat.test(formattedPhone)) {
      return formattedPhone;
    }
    return phone;
  }
};
