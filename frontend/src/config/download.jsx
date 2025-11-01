import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import CodersBankLogo from "../assets/bank.png";

import {
  formatAccount,
  formatDate,
  formatTime,
  getTransactionConfig,
} from "../utils/transactionUtils";

export const downloadPDF = (
  accountNumber,
  transactionsData,
  accountDetails
) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    doc.setFillColor(249, 115, 22); 
    doc.rect(0, 0, pageWidth, 35, "F");

    // Logo and Bank Name
    doc.addImage(CodersBankLogo, "PNG", 14, 8, 20, 20); 
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Coders Bank", 40, 22);

    // Account Information
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Account: ${formatAccount(accountNumber)}`, pageWidth - 14, 15, {
      align: "right",
    });

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Generated: ${currentDate}`, pageWidth - 14, 22, {
      align: "right",
    });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", 14, 45);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const totalTransactions = transactionsData.length;
    const totalCredits = transactionsData.filter((t) => {
      const config = getTransactionConfig(
        t.transactionType,
        t.amount,
        t.senderAccount,
        t.receiverAccount,
        accountNumber
      );
      return config.sign === "+";
    }).length;
    const totalDebits = totalTransactions - totalCredits;

    const currentBalance =
      transactionsData.length > 0
        ? transactionsData[0].balance
        : accountDetails.balance || 0;

    doc.text(`Total Transactions: ${totalTransactions}`, 14, 52);
    doc.text(`Credits: ${totalCredits}`, 14, 58);
    doc.text(`Debits: ${totalDebits}`, 14, 64);
    doc.text(`Current Balance: $${currentBalance}`, 14, 70);

    // Table data
    const tableData = transactionsData.map((transaction) => {
      const config = getTransactionConfig(
        transaction.transactionType,
        transaction.amount,
        transaction.senderAccount,
        transaction.receiverAccount,
        accountNumber
      );

      const details = [];
      if (transaction.senderAccount != 0) {
        details.push(`From: ${formatAccount(transaction.senderAccount)}`);
      }
      details.push(`To: ${formatAccount(transaction.receiverAccount)}`);

      return [
        `#${transaction.id}`,
        formatDate(transaction.transactionDate),
        formatTime(transaction.transactionDate),
        details.join("\n"),
        config.label,
        `${config.sign} $${transaction.amount}`,
        `$${transaction.balance}`,
      ];
    });

    autoTable(doc, {
      startY: 78,
      head: [["ID", "Date", "Time", "Details", "Type", "Amount", "Balance"]],
      body: tableData,
      theme: "striped",
      headStyles: {
        fillColor: [249, 115, 22],
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
      },
      bodyStyles: {
        fontSize: 8,
        textColor: 50,
      },
      alternateRowStyles: {
        fillColor: [254, 242, 232],
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 30 },
        2: { cellWidth: 20 },
        3: { cellWidth: 40 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25, halign: "right" },
        6: { cellWidth: 25, halign: "right" },
      },
      margin: { top: 78, left: 14, right: 14 },
      didDrawPage: (data) => {
        // Footer
        const footerY = pageHeight - 15;
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Page ${doc.internal.getNumberOfPages()}`,
          pageWidth / 2,
          footerY,
          { align: "center" }
        );
        doc.text(
          "This is a computer-generated document",
          pageWidth / 2,
          footerY + 5,
          { align: "center" }
        );
      },
    });

    // Save the PDF
    const fileName = `transactions_${accountNumber}_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
  }
};
