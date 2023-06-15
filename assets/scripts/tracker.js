const data = JSON.parse(localStorage.getItem("data")) || [];

function dateToEuropean(date) {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

function isDivisibleBy(number, divisor) {
  if (number !== 0 && number % divisor === 0) {
    return {
      isDivisible: true,
      result: number / divisor,
    };
  }
  return {
    isDivisible: false,
  };
}

function diffBetweenStartAndEndOfNumberArray(data) {
  console.log(data[0], data[data.length - 1]);
  const number = data[0] - data[data.length - 1];
  return number < 0 ? number * -1 : number;
}

function reverse(data, limit) {
  if (limit && data.length > limit - 1) {
    data = data.slice(0, limit);
  }

  const reversed = [];
  for (let i = 0; i < data.length; i++) {
    reversed.unshift(data[i]);
  }
  return reversed;
}

function isTrendRising(data) {
  const reversed = reverse(data, 7);
  let upTrend = 0;

  for (let i = 0; i < reversed.length; i++) {
    if (i + 1 === reversed.length) {
      break;
    }

    const next = reversed[i + 1].weight;
    const current = reversed[i].weight;

    if (next > current) {
      upTrend++;
    }
  }

  return upTrend > reversed.length - upTrend ? true : false;
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

let index = data.length - 1;
data.forEach((item) => {
  document.write(`
        ${
          isDivisibleBy(index + 1, 7).isDivisible
            ? '<div class="weekly">Week ' +
              Number(isDivisibleBy(index + 1, 7).result) +
              "</div>"
            : ""
        }
        <div class="track shadow">
          <div class="weight">${item.weight}kg</div>
          <div class="info">${dateToEuropean(new Date(item.date))}</div>
        </div>
    `);
  index--;
});

if (isTrendRising(data) && data.length > 1) {
  document.querySelector("#trend-up").style.display = "block";
} else if (!isTrendRising(data) && data.length > 1) {
  document.querySelector("#trend-down").style.display = "block";
}
