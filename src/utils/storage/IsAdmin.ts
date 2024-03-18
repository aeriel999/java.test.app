import {jwtDecode} from "jwt-decode";

export const IsAdmin = (token: string | null) => {
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token) as any;

        for (const role of decodedToken.roles) {
            if (role.toLowerCase().includes('admin')) {
                return true; // Return true if admin role is found
            }
        }

        return false;
    } catch (error) {
        console.error('Error in token decode:', error);
        return false;
    }
};
