export function toastShow(text, statue) {
  let toastContent = document.getElementById("toastContent");
  let toastStatue = document.getElementById("toastStatue");
  toastContent.innerText = text;
  if (statue == "wrong") {
    toastStatue.innerHTML = `  <i class="fa-solid fa-circle-xmark text-danger"></i>`;
  } else if (statue == "right") {
    toastStatue.innerHTML = `
    <i class="fa-solid fa-circle-check text-success"></i>`;
  }
  const toastEl = document.querySelector(".toast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
