import roles from "../config/roles.json" assert { type: "json" }

class Permissions {
    constructor() {
        this.permissions = []
    }

    getPermissionsByRoleName(roleName) {
        const role = roles.roles.find((r) => r.name === roleName)
        return role ? role.permissions : []
    }
}

export { Permissions }
