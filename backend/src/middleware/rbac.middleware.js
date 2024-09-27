import { Permissions } from "../models/permission.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Role } from "../models/roles.model.js"

const checkPermission = (permission) => {
    return async (req, res, next) => {
        try {
            const userRole = req.user ? req.user.role : "anonymous" // Default to "anonymous" if no user

            console.log(`User Role: ${userRole}`) // Debugging, can be removed

            // Get permissions based on user role
            const permissionsInstance = new Permissions()
            const userPermissions =
                await permissionsInstance.getPermissionsByRoleName(userRole)
            console.log(userPermissions)

            // Check if the user has the required permission
            if (userPermissions.includes(permission)) {
                return next()
            } else {
                return res
                    .status(403)
                    .json(
                        new ApiResponse(
                            403,
                            "Access denied",
                            "You do not have permission to access this resource."
                        )
                    )
            }
        } catch (error) {
            console.error("Error checking permissions:", error)
            return res
                .status(500)
                .json(
                    new ApiResponse(500, "Internal server error", error.message)
                )
        }
    }
}

export { checkPermission }
