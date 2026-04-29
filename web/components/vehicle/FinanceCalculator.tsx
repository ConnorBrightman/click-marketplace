"use client";

import { useState } from "react";

const REPRESENTATIVE_APR = 9.9;

function calcMonthly(principal: number, aprPct: number, months: number): number {
  if (principal <= 0) return 0;
  const rate = aprPct / 100 / 12;
  return (principal * rate) / (1 - Math.pow(1 + rate, -months));
}

function gbp(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function FinanceCalculator({ pricePence }: { pricePence: number }) {
  const vehiclePrice = pricePence / 100;
  const [depositPct, setDepositPct] = useState(10);
  const [termMonths, setTermMonths] = useState(48);

  const deposit = Math.round(vehiclePrice * (depositPct / 100));
  const principal = vehiclePrice - deposit;
  const monthly = calcMonthly(principal, REPRESENTATIVE_APR, termMonths);
  const totalCredit = monthly * termMonths;
  const totalRepayable = deposit + totalCredit;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="font-bold text-gray-900 mb-4">Finance calculator</h2>

      <div className="space-y-5">
        {/* Deposit slider */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="font-medium text-gray-700">Deposit</label>
            <span className="font-semibold text-gray-900">{gbp(deposit)} ({depositPct}%)</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={depositPct}
            onChange={(e) => setDepositPct(Number(e.target.value))}
            className="w-full accent-teal-400"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Term selector */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Loan term</p>
          <div className="grid grid-cols-4 gap-1.5">
            {[24, 36, 48, 60].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTermMonths(t)}
                className={`py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  termMonths === t
                    ? "bg-teal-400 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t}mo
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Estimated monthly payment</p>
          <p className="text-3xl font-extrabold text-navy-500">
            {gbp(monthly)}
            <span className="text-base font-medium text-gray-500">/mo</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">{REPRESENTATIVE_APR}% APR representative</p>
        </div>

        {/* Breakdown */}
        <div className="text-sm space-y-1.5 text-gray-600">
          <div className="flex justify-between">
            <span>Vehicle price</span>
            <span className="font-medium text-gray-900">{gbp(vehiclePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Deposit</span>
            <span className="font-medium text-gray-900">{gbp(deposit)}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount of credit</span>
            <span className="font-medium text-gray-900">{gbp(principal)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-1.5">
            <span className="font-semibold text-gray-900">Total repayable</span>
            <span className="font-semibold text-gray-900">{gbp(totalRepayable)}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          This is an estimate only. Subject to status and affordability checks. Finance arranged through third-party lenders. Written quotations available on request.
        </p>
      </div>
    </div>
  );
}
