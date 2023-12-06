import VehicleMakeStore from '../Stores/VehicleMakeStore';
import BaseService from './BaseService';

class VehicleModelService extends BaseService {
    constructor() {
        super('https://test-project-for-mono-default-rtdb.europe-west1.firebasedatabase.app/vehicles');
    }

    // Read all models
    async getVehicleModels() {
        try {
            const response = await this.request(
                `/VehicleModel.json?orderBy="MakeId"&equalTo="${VehicleMakeStore.selectedVehicleMake.Id}"`
            );
            return response;
        } catch (error) {
            console.error('Error fetching vehicle models:', error.message);
            throw error;
        }
    }
}

export default VehicleModelService;
