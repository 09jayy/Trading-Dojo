export const update = (email, username, password, confirmPassword) => {
    updateEmail(email);
    updateUsername(username);
    updatePassword(password, confirmPassword);
}

const updateEmail = (email) => {
    console.log("email: ", email);
}

const updateUsername = (username) => {
    console.log("username: ", username);
}

const updatePassword = (password, confirmPassword) => {
    console.log("password: ", password)
    console.log("confirmation: ", confirmPassword)
}