const emailFormat = (email) => {
    const atExist = email.match('@');
    return atExist ? true : false;
}

const passwordValidation = (password) => {
    const count = String(password).length;
    return count >= 5 ? true : false;
}

module.exports = { emailFormat, passwordValidation };