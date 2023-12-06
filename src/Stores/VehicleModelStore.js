import { makeObservable, observable, action, runInAction } from 'mobx';
import BaseStore from './BaseStore';
import VehicleModelService from '../Services/VehicleModelService';

class VehicleModelStore extends BaseStore {
    // Fetched Models data
    vehicleModels = [];

    // initialize service
    vehicleModelService = new VehicleModelService();

    constructor() {
        super();
        makeObservable(this, {
            vehicleModels: observable,

            getVehicleModels: action,
        });
    }

    // Read
    async getVehicleModels() {
        try {
            const modelsObject = await this.vehicleModelService.getVehicleModels();
            const modelsArray = Object.values(modelsObject); // Convert the object to an array
            runInAction(() => {
                this.vehicleModels = modelsArray;
            });
        } catch (error) {
            console.error('Error fetching vehicle models:', error.message);
            throw error;
        }
    }
}

export default new VehicleModelStore();
