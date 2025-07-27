/**
 * Print utilities for generating PDF reports and print-friendly views
 */

/**
 * Print a specific element or the entire page
 */
export const printElement = (elementId?: string) => {
  if (elementId) {
    const element = document.getElementById(elementId)
    if (!element) return

    const originalContents = document.body.innerHTML
    const printContents = element.innerHTML

    document.body.innerHTML = `
      <html>
        <head>
          <title>প্রিন্ট রিপোর্ট - ফ্রেন্ডস এসোসিয়েশন</title>
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              font-family: 'Tahoma', 'SolaimanLipi', sans-serif;
              font-size: 12px;
              line-height: 1.4;
              color: #000;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f0f0f0;
              font-weight: bold;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo {
              width: 60px;
              height: 60px;
            }
            .no-print {
              display: none;
            }
            @media print {
              .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `

    window.print()
    document.body.innerHTML = originalContents
    window.location.reload()
  } else {
    window.print()
  }
}

/**
 * Generate PDF from HTML element
 */
export const generatePDF = async (elementId: string, filename: string = 'report.pdf') => {
  try {
    // For now, use the print functionality
    // In production, you would use html2canvas + jsPDF
    printElement(elementId)
  } catch (error) {
    console.error('PDF generation failed:', error)
    alert('PDF তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।')
  }
}

/**
 * Format currency for Bengali locale
 */
export const formatCurrency = (amount: number): string => {
  return `৳${amount.toLocaleString('bn-BD')}`
}

/**
 * Format date for Bengali locale
 */
export const formatDate = (date: Date): string => {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ]
  
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  
  return `${day} ${month}, ${year}`
}
