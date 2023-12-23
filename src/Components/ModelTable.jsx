import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme
import VehicleModelStore from '../Stores/VehicleModelStore';
import VehicleMakeStore from '../Stores/VehicleMakeStore';

export default function ModelTable() {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);

    // Column Definitions: Defines & controls grid columns
    const columnDefs = [
        { headerName: 'Model', field: 'Name' },
        { headerName: 'Abreviation', field: 'Abrv' },
        { field: 'Id' },
        { field: 'MakeId' },
    ];

    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            filter: true,
        }),
        []
    );

    const autoSizeStrategy = {
        type: 'fitCellContents',
    };

    const onRowClicked = (event) => {
        // Save selected vehicle info
        const selectedModel = event.data.Id;
        const selectedMake = event.data.MakeId;
        VehicleModelStore.selectedVehicleModel = event.data;
        // Toggle edit mode
        VehicleModelStore.isCreate = false;
        // Route to the EditPage for the selected Model
        navigate(`/vehicleMakes/${selectedMake}/vehicleModels/${selectedModel}/edit`);
    };

    const onCreateClicked = () => {
        const selectedMake = VehicleMakeStore.selectedVehicleMake.Id;
        // Toggle create mode
        VehicleModelStore.isCreate = true;
        // Route to the CreatePage for the selected Model
        navigate(`/vehicleMakes/${selectedMake}/vehicleModels/create`);
    };

    // Get Model data to display in rows
    useEffect(() => {
        VehicleModelStore.getVehicleModels().then(() => setRowData(VehicleModelStore.vehicleModels));
        VehicleModelStore.selectedVehicleMake = VehicleMakeStore.selectedVehicleMake;
    }, []);

    return (
        <div>
            <div className="ag-theme-alpine-dark" style={{ paddingBottom: '2%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onRowClicked={onRowClicked}
                    pagination
                    paginationPageSize={5}
                    paginationPageSizeSelector={[2, 5, 10]}
                    autoSizeStrategy={autoSizeStrategy}
                    domLayout="autoHeight"
                />
            </div>
            <button type="button" onClick={onCreateClicked}>
                Create new model
            </button>
        </div>
    );
}
