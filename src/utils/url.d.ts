/**
 * Get the base URL for a specific service
 * @param port - The port number from environment variables
 * @returns The complete base URL for the service
 */
export declare function getServiceBaseUrl(port: string): string;

/**
 * Get the API URL for a specific route
 * @param route - The route number from environment variables
 * @returns The complete API URL
 */
export declare function getApiUrl(route: string): string;

/**
 * Constants for common routes
 */
export declare const ROUTES: {
    readonly LOGIN: '/auth/login';
    readonly PROFILE: '/settings/profile';
}; 