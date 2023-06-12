let data = [];

function dateToEuropean(date) {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

document.querySelector("#add").onclick = function () {
  const addModal = document.querySelector("#add-modal");
  addModal.style.display = "flex";
  document.querySelector("#confirm").onclick = function () {
    const weight = document.querySelector("#weight").value;
    const date = new Date();
    data.unshift({
      weight: weight,
      date: date,
    });
    localStorage.setItem("data", JSON.stringify(data));
    location.reload();
  };
};

data = JSON.parse(localStorage.getItem("data")) || [];
data.forEach((item) => {
  document.write(`
        <div class="track shadow">
        <div class="weight">${item.weight}kg</div>
        <div class="info">${dateToEuropean(new Date(item.date))}</div>
        </div>
    `);
});
