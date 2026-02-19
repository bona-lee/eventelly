'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/Badge';

// Mock payment methods data
const initialPaymentMethods = [
  {
    id: 1,
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2027,
    isDefault: true,
    holderName: 'Design House Inc.',
  },
  {
    id: 2,
    type: 'card',
    brand: 'Mastercard',
    last4: '8888',
    expMonth: 6,
    expYear: 2026,
    isDefault: false,
    holderName: 'Design House Inc.',
  },
];

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [isCardTypeOpen, setIsCardTypeOpen] = useState(false);
  const cardTypeRef = useRef<HTMLDivElement>(null);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    holderName: '',
    cardType: 'credit',
  });

  const cardTypes = [
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardTypeRef.current && !cardTypeRef.current.contains(event.target as Node)) {
        setIsCardTypeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newMethod = {
      id: Date.now(),
      type: 'card',
      brand: detectCardBrand(newCard.cardNumber),
      last4: newCard.cardNumber.slice(-4),
      expMonth: parseInt(newCard.expMonth),
      expYear: parseInt(newCard.expYear),
      isDefault: paymentMethods.length === 0,
      holderName: newCard.holderName,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setIsAddModalOpen(false);
    setNewCard({
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvc: '',
      holderName: '',
      cardType: 'credit',
    });
  };

  const detectCardBrand = (cardNumber: string) => {
    const firstDigit = cardNumber[0];
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Card';
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDeleteCard = () => {
    if (deleteTargetId === null) return;
    const targetMethod = paymentMethods.find((m) => m.id === deleteTargetId);
    const newMethods = paymentMethods.filter((m) => m.id !== deleteTargetId);

    // If deleting the default method, set the first remaining one as default
    if (targetMethod?.isDefault && newMethods.length > 0) {
      newMethods[0].isDefault = true;
    }

    setPaymentMethods(newMethods);
    setDeleteTargetId(null);
  };

  const defaultMethod = paymentMethods.find((m) => m.isDefault);
  const otherMethods = paymentMethods.filter((m) => !m.isDefault);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Payment Methods</h1>
          <p className="text-neutral-500 mt-1">Manage your payment methods for billing</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
          Add Payment Method
        </button>
      </div>

      {/* Active Payment Method */}
      <div className="bg-white rounded-lg border border-neutral-200 mb-6">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-950">Active Payment Method</h2>
          <p className="text-sm text-neutral-500 mt-1">This method will be charged for your invoices</p>
        </div>
        <div className="p-6">
          {defaultMethod ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-10 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{defaultMethod.brand}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-950">
                    {defaultMethod.brand} ending in {defaultMethod.last4}
                  </p>
                  <p className="text-sm text-neutral-500">
                    Expires {defaultMethod.expMonth.toString().padStart(2, '0')}/{defaultMethod.expYear}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">{defaultMethod.holderName}</p>
                </div>
              </div>
              <Badge variant="status" color="success">Active</Badge>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <p className="text-neutral-500 mb-4">No payment method on file</p>
              <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
                Add Payment Method
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Other Payment Methods */}
      {otherMethods.length > 0 && (
        <div className="bg-white rounded-lg border border-neutral-200 mb-6">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h2 className="text-lg font-semibold text-neutral-950">Other Payment Methods</h2>
            <p className="text-sm text-neutral-500 mt-1">Select a method to set it as active</p>
          </div>
          <div className="divide-y divide-neutral-100">
            {otherMethods.map((method) => (
              <div key={method.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{method.brand}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-950">
                      {method.brand} ending in {method.last4}
                    </p>
                    <p className="text-sm text-neutral-500">
                      Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">{method.holderName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="px-3 py-1.5 text-sm font-medium text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                  >
                    Set as Active
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(method.id)}
                    className="p-2 text-neutral-400 hover:text-destructive-text transition-colors"
                    title="Remove payment method"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Security Notice */}
      <div className="bg-neutral-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-status-success-bg rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-status-success-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-950">Secure Payment Processing</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Your payment information is encrypted and securely processed. We never store your full card details on our servers. All transactions are PCI DSS compliant.
            </p>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-lg">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-950">Add Payment Method</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddCard} className="p-6 space-y-4">
              <div>
                <label className="label">Card Type</label>
                <div className="relative" ref={cardTypeRef}>
                  <button
                    type="button"
                    onClick={() => setIsCardTypeOpen(!isCardTypeOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <span className="text-neutral-950 flex-1 truncate">
                      {cardTypes.find((t) => t.value === newCard.cardType)?.label}
                    </span>
                    <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCardTypeOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1">
                        {cardTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => {
                              setNewCard({ ...newCard, cardType: type.value });
                              setIsCardTypeOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors flex items-center justify-between ${newCard.cardType === type.value ? 'bg-admin-primary-50' : ''}`}
                          >
                            <span className="text-neutral-950">{type.label}</span>
                            {newCard.cardType === type.value && (
                              <svg className="w-4 h-4 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="label">Card Number</label>
                <input
                  type="text"
                  value={newCard.cardNumber}
                  onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                  placeholder="1234 5678 9012 3456"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Cardholder Name</label>
                <input
                  type="text"
                  value={newCard.holderName}
                  onChange={(e) => setNewCard({ ...newCard, holderName: e.target.value })}
                  placeholder="Name on card"
                  className="input"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label">Month</label>
                  <input
                    type="text"
                    value={newCard.expMonth}
                    onChange={(e) => setNewCard({ ...newCard, expMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })}
                    placeholder="MM"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Year</label>
                  <input
                    type="text"
                    value={newCard.expYear}
                    onChange={(e) => setNewCard({ ...newCard, expYear: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    placeholder="YYYY"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">CVC</label>
                  <input
                    type="text"
                    value={newCard.cvc}
                    onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    placeholder="123"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn btn-primary">
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-lg">
            <div className="p-6">
              <div className="w-12 h-12 bg-destructive-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-destructive-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-950 text-center mb-2">
                Remove Payment Method?
              </h3>
              <p className="text-sm text-neutral-500 text-center mb-6">
                This payment method will be removed from your account. You can add it again later if needed.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTargetId(null)} className="flex-1 btn btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCard}
                  className="flex-1 bg-destructive-text text-white px-4 py-2.5 rounded-lg font-medium hover:bg-destructive-hover transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
