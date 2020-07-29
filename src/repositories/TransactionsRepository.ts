import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncomes = this.transactions
      .filter(transaction => {
        return transaction.type === 'income';
      })
      .reduce((prevVal, elem) => {
        return prevVal + elem.value;
      }, 0);

    const totalOutcomes = this.transactions
      .filter(transaction => {
        return transaction.type === 'outcome';
      })
      .reduce((prevVal, elem) => {
        return prevVal + elem.value;
      }, 0);

    const balance = {
      income: totalIncomes,
      outcome: totalOutcomes,
      total: totalIncomes - totalOutcomes,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
