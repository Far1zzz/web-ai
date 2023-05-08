import { Column } from "primereact/column";
import { ListService } from "../demo/service/ListService";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import data from "../public/demo/data/daftar-penyakit.json";

const Dashboard = () => {
  const [listPenyakit, setListPenyakit] = useState([]);
  const [lineOptions, setLineOptions] = useState(null);
  const { layoutConfig } = useContext(LayoutContext);
  const [loading, setLoading] = useState(true);
  const [globalFilterPenyakit, setGlobalFilterPenyakit] = useState("");
  const [filterPenyakit, setFilterPenyakit] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    gejala_penyakit: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  const applyLightTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  const applyDarkTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#ebedef",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
        y: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  const onGlobalFilterPenyakitChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filterPenyakit };

    _filters["gejala_penyakit"].value = value;

    setFilterPenyakit(_filters);
    setGlobalFilterPenyakit(value);
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

  const headerPenyakit = renderHeaderPenyakit();

  useEffect(() => {
    ListService.getDaftarPenyakit().then((res) => {
      setListPenyakit(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (layoutConfig.colorScheme === "light") {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }
  }, [layoutConfig.colorScheme]);

  const formatNumber = (value) => {
    return value.toLocaleString();
  };

  const bodyGejala = (rowData) => {
    return formatNumber(rowData.gejala_penyakit).replace(/,/g, ", ");
  };

  // test
  const [inputGejala, setInputGejala] = useState([]);
  const [hasilFilter, setHasilFilter] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    // Mengubah input gejala menjadi array dan menghapus spasi di awal dan akhir
    const gejala = value.split(",").map((item) => item.trim());
    setInputGejala(gejala);
  };

  const handleFilter = (event) => {
    event.preventDefault();

    const penyakitTerfilter = data.data.filter((res) => {
      return res.gejala_penyakit.some((gejala) =>
        inputGejala.includes(gejala.toString())
      );
    });

    setHasilFilter(penyakitTerfilter);
  };

  return (
    <>
      <div className="card">
        <span className="text-center">
          <h3>Page Cek Gejala</h3>
        </span>
        <DataTable
          value={listPenyakit}
          paginator
          rows={10}
          dataKey="id"
          filters={filterPenyakit}
          loading={loading}
          globalFilterFields={["gejala_penyakit"]}
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
        <span className="text-center">
          <h3>Page Cek Gejala</h3>
        </span>
        <form onSubmit={handleFilter}>
          <label>
            <input
              placeholder="Cek Gejala"
              type="text"
              value={inputGejala}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Cek</button>
        </form>
        <br />
        {hasilFilter.length > 0 ? (
          hasilFilter.map((penyakit) => (
            <div key={penyakit.id}>
              <p>Nama Penyakit: {penyakit.nama_penyakit}</p>
              <p>Gejala: {penyakit.gejala_penyakit.join(", ")}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>Tidak ada penyakit yang sesuai dengan gejala yang diinputkan.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
