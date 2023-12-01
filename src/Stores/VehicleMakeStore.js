import { makeObservable, observable, action, runInAction } from 'mobx';
import BaseStore from './BaseStore';
import VehicleMakeService from '../Services/VehicleMakeService';

class VehicleMakeStore extends BaseStore {
    // Fetched Makes data
    vehicleMakes = [];

    // Selected Make data
    selectedVehicleMake = [];

    // Initialize service
    vehicleMakeService = new VehicleMakeService();

    constructor() {
        super();
        makeObservable(this, {
            vehicleMakes: observable,
            selectedVehicleMake: observable,
            getVehicleMakes: action,
        });
    }

    // Fetch all Makes using service
    async getVehicleMakes() {
        try {
            const MakesObject = await this.vehicleMakeService.getVehicleMakes();
            const MakesArray = Object.values(MakesObject); // Convert the object to an array
            runInAction(() => {
                this.vehicleMakes = MakesArray;
            });
        } catch (error) {
            console.error('Error fetching vehicle makes:', error.message);
            throw error;
        }
    }
}

export default new VehicleMakeStore();
