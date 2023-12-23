import VehicleModelEditForm from '../Components/VehicleModelForm';
import form from '../Utils/Form';
import DevTools from 'mobx-react-form-devtools';

export default function VehicleEditPage() {
    DevTools.register({ form });
    DevTools.select('form');

    return (
        <div>
            {process.env.NODE_ENV === 'development' && <DevTools.UI />}
            <VehicleModelEditForm form={form} />
        </div>
    );
}
