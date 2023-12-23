import VehicleMakeStore from '../Stores/VehicleMakeStore';
import BaseService from './BaseService';

class VehicleModelService extends BaseService {
    constructor() {
        super('https://test-project-for-mono-default-rtdb.europe-west1.firebasedatabase.app/vehicles');
    }

    // Create
    async addVehicleModel(vehicleModel) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleModel),
        };
        return this.request(`/VehicleModel/${vehicleModel.Id}/.json`, options);
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

    // Read one model
    async getVehicleModel(vehicleModel) {
        try {
            const response = await this.request(
                `/VehicleModel.json?orderBy="Name"&equalTo="${vehicleModel}"&limitToFirst=1`
            );
            return response;
        } catch (error) {
            console.error('Error fetching vehicle model:', error.message);
            throw error;
        }
    }

    // Update
    async patchVehicleModel(vehicleModel) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleModel),
        };
        return this.request(`/VehicleModel/${vehicleModel.Id}.json`, options);
    }

    // Delete
    async deleteVehicleModel(modelId) {
        const options = {
            method: 'DELETE',
        };
        return this.request(`/VehicleModel/${modelId}.json`, options);
    }
}

export default VehicleModelService;
