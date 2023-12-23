import { autorun } from 'mobx';
import VehicleFormModel from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import en from 'validatorjs/src/lang/en';
import VehicleModelStore from '../Stores/VehicleModelStore';

validatorjs.setMessages('en', en); // Solve error "Cannot read properties of undefined (reading 'def')"

const plugins = {
    dvr: dvr(validatorjs),
};

const fields = [
    {
        name: 'Name',
        label: 'Name',
        placeholder: 'Insert name',
        rules: 'required|string|min:1',
    },
    {
        name: 'Abrv',
        label: 'Abbreviation',
        placeholder: 'Insert abbreviation',
        rules: 'required|string|min:1',
    },
];

const hooks = {
    // On form initialize reset it and reset form status info
    onInit(form) {
        autorun(() => form.reset());
        autorun(() => VehicleModelStore.updateInfo(''));
    },
    // Add new or edit existing Model
    onSuccess(form) {
        if (VehicleModelStore.isCreate) {
            VehicleModelStore.addVehicleModel(form.values()).then(() => {
                VehicleModelStore.updateInfo('Model successfully created!');
                form.reset();
            });
        } else {
            VehicleModelStore.patchVehicleModel(form.values()).then(
                //     () => {
                //     VehicleModelStore.info = 'Model successfully edited!';
                // }
                () => {
                    VehicleModelStore.updateInfo('Model successfully edited!');
                    form.reset();
                }
            );
        }
    },
    onError(form) {
        console.error('Form has errors:', form.errors);
        VehicleModelStore.updateInfo('Check form for errors!');
        form.reset();
    },
};

export default new VehicleFormModel(
    { fields },
    {
        plugins,
        hooks,
    }
);
