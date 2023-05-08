import { Column } from "primereact/column";
import { ListService } from "../demo/service/ListService";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";

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

    const penyakitTerfilter = listPenyakit.filter((res) => {
      return res.gejala_penyakit.some((gejala) =>
        inputGejala.includes(gejala.toString())
      );
    });

    penyakitTerfilter.sort((a, b) => {
      const aMatchCount = a.gejala_penyakit.filter((gejala) =>
        inputGejala.includes(gejala.toString())
      ).length;

      const bMatchCount = b.gejala_penyakit.filter((gejala) =>
        inputGejala.includes(gejala.toString())
      ).length;

      return bMatchCount - aMatchCount;
    });

    setHasilFilter(penyakitTerfilter);
  };

  const [selectedGejala, setSelectedGejala] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const gejalaOptions = [
    { value: "1", label: "Demam" },
    { value: "2", label: "Sakit Kepala" },
    { value: "3", label: "Nyeri Saat Bicara Atau Menelan" },
    { value: "4", label: "Batuk" },
    { value: "5", label: "Hidung Tersumbat" },
    { value: "6", label: "Nyeri Telinga" },
    { value: "7", label: "Nyeri Tenggorokan" },
    { value: "8", label: "Hidung Meler" },
    { value: "9", label: "Letih Dan Lesu" },
    { value: "10", label: "Mual Dan Muntah" },
    { value: "11", label: "Selaput Lendir Merah Dan Bengkak" },
    { value: "12", label: "Ada Benjolan Di Leher" },
    { value: "13", label: "Nyeri Leher" },
    { value: "14", label: "Pembengkakan Kelenjar Getah Bening" },
    { value: "15", label: "Pendarahan Hidung" },
    { value: "16", label: "Suara Serak" },
    { value: "17", label: "Bola Mata Bergetar Tanpa Sadar" },
    { value: "18", label: "Dahi sakit" },
    { value: "19", label: "Leher Bengkak" },
    { value: "20", label: "tuli" },
    { value: "21", label: "Ada Yang Tumbuh Di mulut" },
    { value: "22", label: "Air Liur Menetes" },
    { value: "23", label: "Berat Badan Turun" },
    { value: "24", label: "Bunyi Nafas Abnormal" },
    { value: "25", label: "Insfeksi Sinus" },
    { value: "26", label: "Nyeri Antara Mata" },
    { value: "27", label: "Nyeri Pinggir Hidung" },
    { value: "28", label: "Nyeri Pipi Di Bawah Mata" },
    { value: "29", label: "Nyeri Wajah" },
    { value: "30", label: "Perubahan Kulit" },
    { value: "31", label: "Perubahan Suara" },
    { value: "32", label: "Radang Gendang Telinga" },
    { value: "33", label: "Sakit Gigi" },
    { value: "34", label: "Serangan Vertigo" },
    { value: "35", label: "Telinga Berdenging" },
    { value: "36", label: "Telinga Terasa Penuh" },
    { value: "37", label: "Tenggorokan Gatal" },
    { value: "38", label: "Tubuh Tak Seimbang" },
  ];

  const handleFiltered = (event) => {
    event.preventDefault();

    const penyakitTerfilter = listPenyakit.filter((res) => {
      return res.gejala_penyakit.some((gejala) =>
        selectedGejala.includes(gejala.toString())
      );
    });

    penyakitTerfilter.sort((a, b) => {
      const aMatchCount = a.gejala_penyakit.filter((gejala) =>
        selectedGejala.includes(gejala.toString())
      ).length;

      const bMatchCount = b.gejala_penyakit.filter((gejala) =>
        selectedGejala.includes(gejala.toString())
      ).length;

      return bMatchCount - aMatchCount;
    });

    setFiltered(penyakitTerfilter);
  };

  const handleSelectChange = (event) => {
    setSelectedGejala(event.value);
  };

  const gejalaToString = {
    1: "Demam",
    2: "Sakit Kepala",
    3: "Nyeri Saat Bicara Atau Menelan",
    4: "Batuk",
    5: "Hidung Tersumbat",
    6: "Nyeri Telinga",
    7: "Nyeri Tenggorokan",
    8: "Hidung Meler",
    9: "Letih Dan Lesu",
    10: "Mual Dan Muntah",
    11: "Selaput Lendir Merah Dan Bengkak",
    12: "Ada Benjolan Di Leher",
    13: "Nyeri Leher",
    14: "Pembengkakan Kelenjar Getah Bening",
    15: "Pendarahan Hidung",
    16: "Suara Serak",
    17: "Bola Mata Bergetar Tanpa Sadar",
    18: "Dahi sakit",
    19: "Leher Bengkak",
    20: "tuli",
    21: "Ada Yang Tumbuh Di mulut",
    22: "Air Liur Menetes",
    23: "Berat Badan Turun",
    24: "Bunyi Nafas Abnormal",
    25: "Insfeksi Sinus",
    26: "Nyeri Antara Mata",
    27: "Nyeri Pinggir Hidung",
    28: "Nyeri Pipi Di Bawah Mata",
    29: "Nyeri Wajah",
    30: "Perubahan Kulit",
    31: "Perubahan Suara",
    32: "Radang Gendang Telinga",
    33: "Sakit Gigi",
    34: "Serangan Vertigo",
    35: "Telinga Berdenging",
    36: "Telinga Terasa Penuh",
    37: "Tenggorokan Gatal",
    38: "Tubuh Tak Seimbang",
  };

  const gejalaKeString = (rowData) => {
    const gejala = rowData.gejala_penyakit;
    if (Array.isArray(gejala)) {
      return gejala.map((angka) => gejalaToString[angka] || "").join(", ");
    }
    return "";
  };

  const renderHeaderCek = () => {
    return (
      <form
        className="flex justify-content-start gap-2"
        onSubmit={handleFiltered}
      >
        <MultiSelect
          value={selectedGejala}
          options={gejalaOptions}
          onChange={handleSelectChange}
          placeholder="Pilih Gejala"
          filter
          filterPlaceholder="Cari Gejala"
          maxSelectedLabels={1}
          display="chip"
          className="w-full md:w-15rem sm:w-10rem"
        />
        <Button
          type="submit"
          icon="pi pi-search"
          severity="success"
          aria-label="Search"
        />
      </form>
    );
  };

  const headerCek = renderHeaderCek();

  return (
    <>
      <div className="card">
        <DataTable
          value={filtered}
          paginator
          rows={10}
          dataKey="id"
          filters={filterPenyakit}
          loading={loading}
          rowsPerPageOptions={[5, 10, 25, 50]}
          globalFilterFields={["gejala_penyakit"]}
          header={headerCek}
          emptyMessage="Gejala Belum Di Input"
        >
          <Column
            field="nama_penyakit"
            header="Nama Penyakit"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="gejala_penyakit"
            header="Gejala Penyakit"
            body={gejalaKeString}
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </div>
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
          hasilFilter.map((res) => (
            <div key={res.id}>
              <p>Nama Penyakit: {res.nama_penyakit}</p>
              <p>Gejala: {res.gejala_penyakit.join(", ")}</p>
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
