import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { ListService } from "../../../demo/service/ListService";

const Index = () => {
  const [listGejala, setListGejala] = useState([]);
  const [listPenyakit, setListPenyakit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterGejala, setGlobalFilterGejala] = useState("");
  const [globalFilterPenyakit, setGlobalFilterPenyakit] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_gejala: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [filterPenyakit, setFilterPenyakit] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_panyakit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  useEffect(() => {
    ListService.getDaftarGejala().then((res) => {
      setListGejala(res);
      setLoading(false);
    });

    ListService.getDaftarPenyakit().then((res) => {
      setListPenyakit(res);
      setLoading(false);
    });
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterGejala(value);
  };

  const onGlobalFilterPenyakitChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filterPenyakit };

    _filters["global"].value = value;

    setFilterPenyakit(_filters);
    setGlobalFilterPenyakit(value);
  };

  const renderHeaderGejala = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterGejala}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const renderHeaderPenyakit = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterPenyakit}
            onChange={onGlobalFilterPenyakitChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const headerGejala = renderHeaderGejala();
  const headerPenyakit = renderHeaderPenyakit();

  const formatNumber = (value) => {
    return value.toLocaleString();
  };

  const bodyGejala = (rowData) => {
    return formatNumber(rowData.gejala_penyakit).replace(/,/g, ", ");
  };

  return (
    <>
      <div className="card">
        <DataTable
          value={listPenyakit}
          paginator
          rows={10}
          dataKey="id"
          filters={filterPenyakit}
          loading={loading}
          globalFilterFields={["nama_penyakit", "gejala_penyakit"]}
          header={headerPenyakit}
          emptyMessage="No customers found."
        >
          <Column field="id" header="No" style={{ width: "5px" }} />
          <Column
            field="nama_penyakit"
            header="Nama Penyakit"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="gejala_penyakit"
            header="Gejala Penyakit"
            body={bodyGejala}
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </div>

      <div className="card">
        <DataTable
          value={listGejala}
          paginator
          rows={10}
          dataKey="id"
          filters={filters}
          loading={loading}
          globalFilterFields={["id", "nama_gejala"]}
          header={headerGejala}
          emptyMessage="No customers found."
        >
          <Column field="id" header="No" style={{ width: "5px" }} />
          <Column
            field="nama_gejala"
            header="Gejala"
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </div>
    </>
  );
};

export default Index;
