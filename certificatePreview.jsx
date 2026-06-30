import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CertificatePreview = ({ user, certificate, quiz, onClose }) => {
  const certificateRef = useRef();

  const downloadAsPDF = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    const marginTop = (pageHeight - pdfHeight) / 2;

    pdf.addImage(imgData, "PNG", 10, marginTop > 10 ? marginTop : 10, pdfWidth, pdfHeight);
    pdf.save(`${certificate.title.replace(/\s+/g, "_")}_Certificate.pdf`);
  };

  const printCertificate = () => {
    const printWindow = window.open("", "", "width=1000,height=600");
    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${certificate.title}</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Georgia', serif;
        }
        .certificate-container {
            width: 100%;
            background: linear-gradient(135deg, #fff9e6 0%, #f0e6ff 100%);
            border: 3px solid #d4af37;
            border-radius: 10px;
            padding: 60px 80px;
            text-align: center;
        }
        .badge {
            font-size: 80px;
            margin-bottom: 10px;
        }
        .title {
            font-size: 48px;
            color: #1a1a1a;
            font-weight: bold;
            margin: 20px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .divider {
            width: 150px;
            height: 3px;
            background: linear-gradient(90deg, #d4af37, #ffd700, #d4af37);
            margin: 20px auto;
        }
        .name {
            font-size: 36px;
            font-weight: bold;
            color: #1a1a1a;
            margin: 30px 0;
            text-decoration: underline;
        }
        .content p {
            margin: 15px 0;
            font-size: 18px;
            color: #333;
        }
        .details {
            display: flex;
            justify-content: space-around;
            margin-top: 60px;
            padding-top: 40px;
            border-top: 2px solid #d4af37;
        }
        .detail-item {
            text-align: center;
        }
        .detail-label {
            font-size: 14px;
            color: #666;
        }
        .detail-value {
            font-size: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="badge">🏆</div>
        <div class="title">Certificate of Achievement</div>
        <div class="divider"></div>
        <p style="font-size: 20px; color: #666;">This is to certify that</p>
        <div class="name">${user.name}</div>
        <p style="font-size: 18px;">has successfully completed and demonstrated excellence in</p>
        <p style="font-size: 24px; font-weight: bold; color: #2563eb;">${certificate.title}</p>
        <p style="font-size: 18px; margin-top: 30px;">with an outstanding score of <strong>80% or higher</strong></p>
        <div class="details">
            <div class="detail-item">
                <div class="detail-label">Date Issued</div>
                <div class="detail-value">${certificate.issued}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Certificate ID</div>
                <div class="detail-value">SAP-${certificate.id}-${new Date().getFullYear()}</div>
            </div>
        </div>
    </div>
</body>
</html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Your Certificate</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="p-8 bg-gradient-to-b from-slate-50 to-white">
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-yellow-50 to-purple-50 border-4 border-yellow-500 rounded-lg p-12 text-center shadow-lg"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold text-slate-800 uppercase tracking-wider mb-4">
              Certificate of Achievement
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 mx-auto mb-8"></div>

            <p className="text-lg text-gray-700 mb-2">This is to certify that</p>
            <h2 className="text-3xl font-bold text-slate-800 underline mb-4 decoration-yellow-500 decoration-2">
              {user.name}
            </h2>

            <p className="text-lg text-gray-700 mb-2">has successfully completed and demonstrated excellence in</p>
            <h3 className="text-2xl font-bold text-blue-600 mb-6">{certificate.title}</h3>

            <p className="text-lg text-gray-700 mb-8">
              with an outstanding score of <span className="text-2xl font-bold text-green-600">80% or higher</span>
            </p>

            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t-2 border-yellow-400">
              <div className="text-center">
                <p className="text-sm uppercase text-gray-600 font-semibold mb-2">Date Issued</p>
                <p className="text-lg font-bold text-slate-800">{certificate.issued}</p>
              </div>
              <div className="text-center">
                <p className="text-sm uppercase text-gray-600 font-semibold mb-2">Certificate ID</p>
                <p className="text-lg font-bold text-slate-800">SAP-{certificate.id}-{new Date().getFullYear()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm uppercase text-gray-600 font-semibold mb-2">Institution</p>
                <p className="text-lg font-bold text-slate-800">Science Academy</p>
              </div>
            </div>

            <p className="text-2xl font-cursive italic text-slate-700 mt-8">Science Academy Portal</p>
            <p className="text-xs text-gray-500 italic mt-4">
              This certificate is awarded for outstanding achievement and dedication to learning.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3 flex-wrap justify-center">
          <button
            onClick={downloadAsPDF}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            📥 Download as PDF
          </button>
          <button
            onClick={printCertificate}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            🖨️ Print
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
