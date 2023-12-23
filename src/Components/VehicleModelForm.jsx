/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import VehicleModelStore from '../Stores/VehicleModelStore';

export default observer(({ form }) => {
    const errorObject = form.errors();
    const location = useLocation();

    // Delete model and show info message
    const onDelete = () => {
        VehicleModelStore.deleteVehicleModel(VehicleModelStore.selectedVehicleModel.Id)
            .then(() => {
                VehicleModelStore.updateInfo('Successful delete!');
            })
            .catch((error) => {
                VehicleModelStore.updateInfo('Unsuccessful delete! Error: ', error);
            });
    };

    // Reset form and info message on changing location
    useEffect(() => {
        VehicleModelStore.updateInfo('');
        form.reset();
    }, [form, location]);

    return (
        <form style={{ width: '25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5%' }}>
                <label htmlFor={form.$('Name').id}>{form.$('Name').label}</label>
                <input {...form.$('Name').bind()} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5%' }}>
                <label htmlFor={form.$('Abrv').id}>{form.$('Abrv').label}</label>
                <input {...form.$('Abrv').bind()} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5%' }}>
                <button
                    type="submit"
                    title="Submit vehicle"
                    disabled={!form.isValid || form.isEmpty}
                    onClick={form.onSubmit}
                >
                    Submit
                </button>
                <button type="button" title="Clear form data" onClick={form.onClear}>
                    Clear
                </button>
                <button type="button" title="Reset form data" onClick={form.onReset}>
                    Reset
                </button>
                <button type="button" title="Delete vehicle from database" onClick={onDelete}>
                    Delete
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', color: 'red' }}>
                {Object.keys(errorObject).map((key) => (
                    <div key={key.id}>{errorObject[key]}</div>
                ))}
            </div>
            <p style={{ display: 'flex', flexDirection: 'column' }}>{VehicleModelStore.info}</p>
        </form>
    );
});
