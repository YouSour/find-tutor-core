const LookupValue = {
  dateFormat: [
    { label: "dd/MM/yyyy", value: "dd/MM/yyyy" },
    { label: "yyyy/MM/dd", value: "yyyy/MM/dd" }
  ],
  lang: [{ label: "EN", value: "EN" }, { label: "KH", value: "KH" }],
  industry: [
    {
      label: "IT",
      value: "IT"
    },
    {
      label: "Wholesale and Retail  Trading",
      value: "Wholesale and Retail  Trading"
    },
    {
      label: "Micro Loan",
      value: "Micro Loan"
    },
    {
      label: "Rental & Leasing",
      value: "Rental and Leasing"
    },
    {
      label: "Other",
      value: "Other"
    }
  ],
  status: [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Void", value: "Void" }
  ],
  currency: [
    { label: "KHR", value: "KHR" },
    { label: "USD", value: "USD" },
    { label: "THB", value: "THB" }
  ],
  natureAccount: [
    { label: "Asset", value: "Asset" },
    { label: "Liability", value: "Liability" },
    { label: "Equity", value: "Equity" },
    { label: "Revenue", value: "Revenue" },
    { label: "Expense", value: "Expense" }
  ],
  journalType: [
    { label: "General", value: "General" },
    { label: "Adjustment", value: "Adjustment" },
    { label: "Opening", value: "Opening" },
    { label: "Closing", value: "Closing" },
    { label: "Accrual", value: "Accrual" },
    { label: "Depreciation", value: "Depreciation" }
  ],
  gender: [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" }
  ],
  type: [
    { label: "Super", value: "super" },
    { label: "Admin", value: "admin" },
    { label: "Guest", value: "guest" }
  ]
};

export default LookupValue;
