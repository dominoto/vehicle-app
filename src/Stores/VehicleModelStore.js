import { makeObservable, observable, action, runInAction } from 'mobx';
import BaseStore from './BaseStore';
import VehicleModelService from '../Services/VehicleModelService';
import generateId from '../Utils/Utils';

class VehicleModelStore extends BaseStore {
    // Fetched Models data
    vehicleModels = [];

    // Selected Model data
    selectedVehicleModel = [];

    // Selected Make data
    selectedVehicleMake = [];

    // Is user on Create Model page
    isCreate;

    // Form status info
    info = '';

    // initialize service
    vehicleModelService = new VehicleModelService();

    constructor() {
        super();
        makeObservable(this, {
            vehicleModels: observable,
            selectedVehicleModel: observable,
            selectedVehicleMake: observable,
            isCreate: observable,
            info: observable,
            getVehicleModels: action,
            addVehicleModel: action,
            updateInfo: action,
        });
    }

    // Create
    async addVehicleModel(nameAndAbrv) {
        const vehicleModel = { ...nameAndAbrv };
        vehicleModel.MakeId = this.selectedVehicleMake.Id;
        vehicleModel.Id = generateId(20);
        const newModel = await this.vehicleModelService.addVehicleModel(vehicleModel);
        runInAction(() => {
            this.vehicleModels.push(newModel);
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

    // Update
    async patchVehicleModel(nameAndAbrv) {
        const vehicleModel = {};
        Object.keys(this.selectedVehicleModel)
            .concat(Object.keys(nameAndAbrv))
            .forEach((key) => {
                // If both objects have the same key, overwrite with newer value from form
                if (Object.hasOwn(this.selectedVehicleModel, key) && Object.hasOwn(nameAndAbrv, key)) {
                    vehicleModel[key] = nameAndAbrv[key];
                }
                // Otherwise, copy the value from the object that has the key
                else if (Object.hasOwn(this.selectedVehicleModel, key)) {
                    vehicleModel[key] = this.selectedVehicleModel[key];
                } else if (Object.hasOwn(nameAndAbrv, key)) {
                    vehicleModel[key] = nameAndAbrv[key];
                }
            });
        const patchedModel = await this.vehicleModelService.patchVehicleModel(vehicleModel);
        runInAction(() => {
            this.vehicleModels.push(patchedModel);
        });
    }

    // Delete
    async deleteVehicleModel(modelId) {
        await this.vehicleModelService.deleteVehicleModel(modelId);
    }

    // Update form status info
    updateInfo(data) {
        this.info = data;
    }
}

export default new VehicleModelStore();
