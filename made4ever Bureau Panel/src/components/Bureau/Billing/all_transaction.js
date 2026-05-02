import React, { useEffect, useState } from "react";
import api from '../../../api'
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const TransactionsPage = () => {

const user = JSON.parse(localStorage.getItem("user"));

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!user?._id) return;

        setLoading(true);

        const res = await api.get(
          `/api/payu/transactions/${user._id}`,
          {
            params: {
              page,
              limit,
              status: "",
            },
          }
        );

        setTransactions(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">All Transactions</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
      <div className="space-y-3">
  {transactions.map((tx) => {
    const payment = tx.payment_response || {};

    return (
      <div
        key={tx._id}
        className="p-4 border rounded-lg flex justify-between items-start hover:shadow-sm transition"
      >
        {/* LEFT SIDE */}
        <div className="space-y-1">
          <p className="font-semibold text-gray-800">
            {tx.plan_name}
          </p>

          <p className="text-xs text-gray-500">
            Txn ID: {tx.txnid}
          </p>

          <p className="text-xs text-gray-500">
            Date: {new Date(tx.created_at).toLocaleString()}
          </p>

          <p className="text-xs text-gray-500">
            Payment Mode: {payment.mode || "N/A"}
          </p>

          <p className="text-xs text-gray-500">
            PayU ID: {payment.mihpayid || "N/A"}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-right space-y-1">
          <p className="font-semibold text-gray-900">
            ₹{Number(tx.amount).toLocaleString()}
          </p>

          <p className="text-xs text-green-600">
            +{tx.credits} credits
          </p>

          {/* STATUS BADGE */}
          <span
            className={`text-xs px-2 py-1 rounded ${
              tx.status === "success"
                ? "bg-green-100 text-green-700"
                : tx.status === "failed"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {tx.status}
          </span>

          {/* BANK / EMAIL (optional but useful) */}
          <p className="text-xs text-gray-500">
            {payment.email || ""}
          </p>

          <p className="text-xs text-gray-500">
            {payment.phone || ""}
          </p>
        </div>
      </div>
    );
  })}
</div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default TransactionsPage;