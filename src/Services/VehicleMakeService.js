import BaseService from './BaseService';

class VehicleMakeService extends BaseService {
    constructor() {
        super('https://test-project-for-mono-default-rtdb.europe-west1.firebasedatabase.app/vehicles');
    }

    // Read all makes
    async getVehicleMakes() {
        try {
            const response = await this.request('/VehicleMake.json');
            return response;
        } catch (error) {
            console.error('Error fetching vehicle makes:', error.message);
            throw error;
        }
    }
}

export default VehicleMakeService;
