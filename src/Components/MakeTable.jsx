import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme
import vehicleMakeStore from '../Stores/VehicleMakeStore';

export default function MakeTable() {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);

    // Column Definitions: Defines & controls grid columns
    const columnDefs = [
        { headerName: 'Make', field: 'Name' },
        { headerName: 'Abreviation', field: 'Abrv' },
        { field: 'Id' },
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
        const selectedMake = event.data.Id;
        vehicleMakeStore.selectedVehicleMake = event.data;
        // Route to models list for the selected make
        navigate(`/vehicle-app/vehicleMakes/${selectedMake}`);
    };

    // Get Make data to display in rows
    useEffect(() => {
        vehicleMakeStore.getVehicleMakes().then(() => setRowData(vehicleMakeStore.vehicleMakes));
    }, []);

    return (
        <div className="ag-theme-alpine-dark center">
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
    );
}
