class BaseService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // CRUD data according to options from extended services
    async request(endpoint, options) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
    }
}

export default BaseService;
