import roles from "../config/roles.json" assert { type: "json" }
class Role {
    constructor() {
        this.roles = roles.roles
    }

    getRoleByName(name) {
        return this.roles.find((role) => role.name === name)
    }

    getRoles() {
        return this.roles
    }
}

export { Role }
