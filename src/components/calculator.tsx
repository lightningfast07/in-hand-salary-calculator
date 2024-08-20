import React, { useState } from "react";
import "./calculator.css";

const Calculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | string>("");
  const [annualInHandSalary, setAnnualInHandSalary] = useState<number | null>(
    null
  );
  const [monthlyInHandSalary, setMonthlyInHandSalary] = useState<number | null>(
    null
  );
  const [includeGratuity, setIncludeGratuity] = useState<boolean>(false);
  const [pfValue, setPfValue] = useState<number | string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleGratuityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeGratuity(event.target.checked);
  };

  const handlePfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 6 && value <= 12) {
      setPfValue(value);
    } else {
      setPfValue("");
    }
  };

  const handleCalculate = () => {
    const parsedValue = parseFloat(inputValue.toString());
    const parsedPfValue = parseFloat(pfValue.toString());

    if (!isNaN(parsedValue)) {
      // Calculate gratuity if included
      const gratuity = includeGratuity ? parsedValue * 0.0491 : 0;
      const pfDeduction = parsedPfValue
        ? parsedValue * (parsedPfValue / 100)
        : 0;

      const taxableIncome = parsedValue - gratuity - pfDeduction;
      const tax = calculateTax(taxableIncome);
      const annualSalary = taxableIncome - tax;
      const monthlySalary = annualSalary / 12;

      setAnnualInHandSalary(annualSalary);
      setMonthlyInHandSalary(monthlySalary);
    } else {
      setAnnualInHandSalary(null);
      setMonthlyInHandSalary(null);
      alert("Please enter a valid number");
    }
  };

  const calculateTax = (salary: number): number => {
    let tax = 0;

    if (salary > 1500000) {
      tax += (salary - 1500000) * 0.3;
      salary = 1500000;
    }
    if (salary > 1200000) {
      tax += (salary - 1200000) * 0.2;
      salary = 1200000;
    }
    if (salary > 1000000) {
      tax += (salary - 1000000) * 0.15;
      salary = 1000000;
    }
    if (salary > 700000) {
      tax += (salary - 700000) * 0.1;
      salary = 700000;
    }
    if (salary > 300000) {
      tax += (salary - 300000) * 0.05;
    }

    return tax;
  };

  return (
    <div>
      <nav className="navbar">
        <h1>In-hand Salary Calculator</h1>
      </nav>
      <div className="calculator-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your annual salary"
          className="input-field"
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={includeGratuity}
            onChange={handleGratuityChange}
          />
          <label>Include Gratuity (4.91%)</label>
        </div>
        <div className="pf-container">
          <label>PF Contribution (%): </label>
          <input
            type="number"
            value={pfValue}
            onChange={handlePfChange}
            min="6"
            max="12"
            placeholder="Enter PF percentage (6-12)"
            className="input-field"
          />
        </div>
        <button onClick={handleCalculate} className="calculate-button">
          Calculate
        </button>
        {annualInHandSalary !== null && (
          <div>
            <p>
              Annual In-hand Salary: ₹ {annualInHandSalary.toLocaleString()}
            </p>
            <p>
              Monthly In-hand Salary: ₹ {monthlyInHandSalary?.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
