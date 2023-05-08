export const ListService = {
  cekGejala() {
    return fetch("/demo/data/daftar-penyakit.json", {
      headers: { "Chace-Control": "no-chace" },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
  getDaftarGejala() {
    return fetch("/demo/data/daftar-gejala.json", {
      headers: { "Chace-Control": "no-chace" },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },

  getDaftarPenyakit() {
    return fetch("/demo/data/daftar-penyakit.json", {
      headers: { "Chace-Control": "no-chace" },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
};
