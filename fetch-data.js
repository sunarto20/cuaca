const BASE_URL = "https://ibnux.github.io/BMKG-importer/cuaca";

let dataCuaca;

const getData = async () => {
  const request = await fetch(`${BASE_URL}/wilayah.json`);
  const data = await request.json();

  parseDataTotableData(data);
  dataCuaca = data;
};

const parseDataTotableData = (response) => {
  let content = "";
  let number = 1;
  response.forEach((data) => {
    content += printTableData(data, number++);
  });
  document.getElementById("table-data").innerHTML = content;
};

$(document).on("click", ".dataProvinsi", function () {
  const id = $(this).data("id");

  const cuaca = dataCuaca.find((cuaca) => {
    return cuaca.id === id.toString();
  });

  handleDetail(id, cuaca);
});

const handleDetail = (id, cuaca) => {
  parseOffcanvasData(cuaca);
  getDetail(id).then((detailCuaca) => {
    let content = "";
    content +=
      detailCuaca.length === 0
        ? detailNotFound()
        : parseDetailCuaca(detailCuaca);

    document.getElementById("data-cuaca").innerHTML = content;
  });
};

const getDetail = async (id) => {
  const content = "";

  const request = await fetch(`${BASE_URL}/${id}.json`);
  const data = await request.json();
  return data;
};

const parseOffcanvasData = (cuaca) => {
  let content = `Ini adalah detail cuaca untuk kecamatan ${cuaca.kecamatan}, yang terletak pada ${cuaca.kota} di provinsi ${cuaca.propinsi}`;

  document.getElementById("description").innerHTML = content;
};

const parseDetailCuaca = (data) => {
  let content = "";
  data.forEach((cuaca) => {
    content += printDetailCuaca(cuaca);
  });

  return content;
};

const printDetailCuaca = (cuaca) => {
  return `<div class="col-sm-6 mb-3 " >
            <div class="card">
                <div class="card-body text-center">
                    <div class="text-center">
                        <p class="mb-0">${cuaca.cuaca}</p>
                        <small class="text-timer text-secondary">${cuaca.jamCuaca}</small>
                    </div>
                    <div class="">
                        <img src="https://ibnux.github.io/BMKG-importer/icon/${cuaca.kodeCuaca}.png" alt="">
                    </div>
                    <div class="">
                        <p class="suhu">
                            Suhu <span>${cuaca.tempC}&deg;</span>Celcius
                        </p>
                    </div>
                </div>
            </div>
          </div>`;
};

const detailNotFound = () => {
  return "<p class='text-center fw-bold'>Data Tidak tersedia</p>";
};

const printTableData = (data, number) => {
  return `<tr class="dataProvinsi" data-id="${data.id}" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <th scope="row">${number}</th>
            <td>${data.propinsi}</td>
            <td>${data.kota}</td>
            <td>${data.kecamatan}</td>
            <td>${data.lat}</td>
            <td>${data.lon}</td>
          </tr>`;
};
