/**
 * Utility functions for handling URLs and routes in the application
 */

/**
 * Get the base URL for a specific service
 * @param port - The port number from environment variables
 * @returns The complete base URL for the service
 */
export const getServiceBaseUrl = (port: string) => {
    const serverIp = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;
    return `http://${serverIp}:${port}`;
};

/**
 * Get the API URL for a specific route
 * @param route - The route number from environment variables
 * @returns The complete API URL
 */
export const getApiUrl = (route: string) => {
    const serverIp = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;
    const irpApiPort = process.env.NEXT_PUBLIC_IRP_API_PORT;
    // Remove any leading/trailing slashes from route and add them consistently
    const cleanRoute = route.replace(/^\/+|\/+$/g, '');
    return `http://${serverIp}:${irpApiPort}/${cleanRoute}`;
};

/**
 * Get the API URL for a specific service route
 * @param port - The port number for the service
 * @param route - The route path
 * @returns The complete API URL
 */
export const getServiceApiUrl = (port: string, route: string) => {
    const serverIp = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;
    // Remove any leading/trailing slashes from route and add them consistently
    const cleanRoute = route.replace(/^\/+|\/+$/g, '');
    return `http://${serverIp}:${port}/${cleanRoute}`;
};

/**
 * Get the interrogator API URL
 * @param endpoint - The endpoint path
 * @returns The complete interrogator API URL
 */
export const getInterrogatorApiUrl = (endpoint: string = '') => {
    const serverIp = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;
    const port = process.env.NEXT_PUBLIC_INTERROGATOR_API_ROUTE;
    const cleanEndpoint = endpoint.replace(/^\/+|\/+$/g, '');
    return `http://${serverIp}:${port}/${cleanEndpoint}`;
};

/**
 * Constants for common routes
 */
export const ROUTES = {
    LOGIN: 'auth/login',
    PROFILE: 'settings/profile',
    // Add more common routes as needed
} as const; 