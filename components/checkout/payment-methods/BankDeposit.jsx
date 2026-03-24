"use client";

export default function BankDeposit({ isSelected, onSelect }) {
  return (
    <div className="border rounded p-4 bg-blue-50 border-blue-200">
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="bank"
          name="paymentMethod"
          value="bank"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.value)}
        />
        <label htmlFor="bank" className="font-medium">
          Bank Deposit
        </label>
      </div>

      {isSelected && (
        <div className="ml-6 space-y-2 text-sm">
          <p>
            <strong>
              Bank Deposit (Meezan Bank) – Pay via bank transfer
            </strong>
          </p>
          <p>
            Transfer the total to our Meezan Bank account. Your order will be
            processed once payment is confirmed.
          </p>
          <div className="mt-3 space-y-1">
            <p>
              <strong>Bank:</strong> Meezan Bank
            </p>
            <p>
              <strong>Account Title:</strong> Shazi Jewels
            </p>
            <p>
              <strong>Account Number:</strong> 10010103943364
            </p>
            <p>
              <strong>IBAN:</strong> PK26MEZN0010103903994
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <p className="font-medium text-red-600">
              📌 Important Instructions:
            </p>
            <div className="space-y-1 text-xs">
              <p>
                📱 Share a screenshot or receipt of your payment to our
                WhatsApp: 0331-6801200
              </p>
              <p>
                📝 Include your Order Number as the payment reference
              </p>
              <p>
                ✅ Make the payment within 48 hours of placing your order
              </p>
              <p>
                ✅ We'll confirm your order once the payment is received and
                verified
              </p>
            </div>
          </div>

          <div className="mt-3 text-xs">
            <p>For any help, contact us at:</p>
            <p>
              📞 0492722500 📱 0331-6801200 📧 contact@shazijewels.pk
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

