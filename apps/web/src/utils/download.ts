export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const downloadText = (arg1: string, arg2: string): void => {
  let content = arg1;
  let filename = arg2;
  // If first argument is a filename (ends with extension or doesn't have newlines while second has text)
  if (arg1.includes('.') && (arg1.endsWith('.txt') || arg1.endsWith('.json') || arg1.endsWith('.csv') || arg1.endsWith('.xml') || arg1.endsWith('.svg') || arg1.endsWith('.html') || (!arg1.includes('\n') && arg2.includes('\n')))) {
    filename = arg1;
    content = arg2;
  }
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, filename);
};

export const downloadCSV = (data: any[][], filename: string): void => {
  const csvContent = data.map(row => 
    row.map(cell => {
      let str = String(cell ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        str = `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',')
  ).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  downloadBlob(blob, filename);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
