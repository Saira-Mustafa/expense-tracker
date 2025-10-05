const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const typeInput = document.getElementById("type");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", function(e){
  e.preventDefault();

  const transaction = {
    id : Date.now(),
    description : descriptionInput.value,
    amount : parseFloat(amountInput.value),
    date : dateInput.value,
    type : typeInput.value,
  };

  transactions.push(transaction);

   updateUI();
   saveData();

  form.reset();
});

function renderTransactions(){
  transactionList.innerHTML = "";

  transactions.forEach(tr => {
    const li = document.createElement("li");
    li.classList.add(tr.type);
    li.innerHTML = `
    <span>${tr.description}-$${tr.amount.toFixed(2)} (${tr.date})</span>
    <button data-id="${tr.id}">❌</button>
    `;
    transactionList.appendChild(li);
  });
}

function updateSummary(){
  let income = 0;
  let expense = 0;

  transactions.forEach(tr => {
    if(tr.type === "income"){
      income += tr.amount;
    }else{
      expense += tr.amount;
    }
  });

  const balance = income-expense;

  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${income.toFixed(2)}`;
  expenseEl.textContent = `$${expense.toFixed(2)}`;
}

transactionList.addEventListener("click", function(e){
  if (e.target.tagName === "BUTTON"){
    const id = parseInt(e.target.dataset.id);
    transactions = transactions.filter(tr => tr.id !== id);

    updateUI();
    saveData();
  }
});

function updateUI() {
  renderTransactions();
  updateSummary();
}

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
 updateUI();