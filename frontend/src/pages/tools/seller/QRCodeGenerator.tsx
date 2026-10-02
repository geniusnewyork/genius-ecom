import React, { useState, useEffect } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Select } from '../../../components/ui/Select';
import { Input } from '../../../components/ui/Input';
import { Download, Copy, QrCode as QrIcon } from 'lucide-react';
import QRCode from 'qrcode';
import { downloadText } from '../../../utils/download';

type QRType = 'url' | 'text' | 'whatsapp' | 'upi' | 'email' | 'phone' | 'wifi';

export default function QRCodeGenerator() {
  const [qrType, setQrType] = useState<QRType>('url');
  
  // Specific input states
  const [url, setUrl] = useState('https://montygenius.com');
  const [text, setText] = useState('Welcome to Monty Genius Ecom Tools!');
  const [waPhone, setWaPhone] = useState('919876543210');
  const [waMessage, setWaMessage] = useState('Hi! I want to order this product.');
  const [upiVpa, setUpiVpa] = useState('seller@okaxis');
  const [upiName, setUpiName] = useState('Monty Genius Store');
  const [upiAmount, setUpiAmount] = useState('499');
  const [emailTo, setEmailTo] = useState('support@example.com');
  const [emailSubject, setEmailSubject] = useState('Product Inquiry');
  const [emailBody, setEmailBody] = useState('Hello, I would like to know about...');
  const [phoneNumber, setPhoneNumber] = useState('+919876543210');
  const [wifiSsid, setWifiSsid] = useState('Store_Guest_WiFi');
  const [wifiPassword, setWifiPassword] = useState('welcome123');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');

  // Customization
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(300);

  const [pngDataUrl, setPngDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');

  // Compute final encoded payload
  const getPayload = (): string => {
    switch (qrType) {
      case 'url':
        return url.startsWith('http') ? url : `https://${url}`;
      case 'text':
        return text;
      case 'whatsapp': {
        const cleanPhone = waPhone.replace(/\D/g, '');
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;
      }
      case 'upi':
        return `upi://pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(upiName)}${upiAmount ? `&am=${upiAmount}` : ''}&cu=INR`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phoneNumber}`;
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
      default:
        return url;
    }
  };

  useEffect(() => {
    const payload = getPayload();
    if (!payload) return;

    // Generate PNG
    QRCode.toDataURL(payload, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    }).then(setPngDataUrl).catch(console.error);

    // Generate SVG
    QRCode.toString(payload, {
      type: 'svg',
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    }).then(setSvgString).catch(console.error);
  }, [
    qrType, url, text, waPhone, waMessage, upiVpa, upiName, upiAmount,
    emailTo, emailSubject, emailBody, phoneNumber, wifiSsid, wifiPassword,
    wifiEncryption, fgColor, bgColor, size
  ]);

  const downloadPNG = () => {
    if (!pngDataUrl) return;
    const a = document.createElement('a');
    a.href = pngDataUrl;
    a.download = `monty_genius_qr_${qrType}.png`;
    a.click();
  };

  const downloadSVG = () => {
    if (!svgString) return;
    downloadText(`monty_genius_qr_${qrType}.svg`, svgString);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      <ToolHeader 
        title="QR Code Generator" 
        description="Generate high-resolution PNG & vector SVG QR codes for payments, URLs, WhatsApp, and more." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-7 space-y-5">
          <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                QR Code Type
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {[
                  { id: 'url', label: 'Website / URL' },
                  { id: 'upi', label: 'UPI Payment' },
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'text', label: 'Plain Text' },
                  { id: 'phone', label: 'Phone Call' },
                  { id: 'email', label: 'Email' },
                  { id: 'wifi', label: 'Wi-Fi Network' },
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setQrType(t.id as QRType)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      qrType === t.id 
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Specific Fields */}
            {qrType === 'url' && (
              <Input
                label="Target Website URL"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://yourstore.com"
              />
            )}

            {qrType === 'text' && (
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Plain Text</label>
                <textarea
                  className="w-full border rounded-lg p-3 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  rows={3}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Enter text..."
                />
              </div>
            )}

            {qrType === 'upi' && (
              <div className="space-y-3">
                <Input
                  label="UPI ID / VPA"
                  value={upiVpa}
                  onChange={e => setUpiVpa(e.target.value)}
                  placeholder="merchant@okhdfcbank"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Payee Name"
                    value={upiName}
                    onChange={e => setUpiName(e.target.value)}
                    placeholder="Store Name"
                  />
                  <Input
                    label="Amount (Optional, ₹)"
                    type="number"
                    value={upiAmount}
                    onChange={e => setUpiAmount(e.target.value)}
                    placeholder="499"
                  />
                </div>
              </div>
            )}

            {qrType === 'whatsapp' && (
              <div className="space-y-3">
                <Input
                  label="Phone Number (With Country Code, e.g. 919876543210)"
                  value={waPhone}
                  onChange={e => setWaPhone(e.target.value)}
                  placeholder="919876543210"
                />
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Pre-filled Message</label>
                  <textarea
                    className="w-full border rounded-lg p-3 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    rows={2}
                    value={waMessage}
                    onChange={e => setWaMessage(e.target.value)}
                  />
                </div>
              </div>
            )}

            {qrType === 'phone' && (
              <Input
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="+919876543210"
              />
            )}

            {qrType === 'email' && (
              <div className="space-y-3">
                <Input
                  label="Recipient Email"
                  type="email"
                  value={emailTo}
                  onChange={e => setEmailTo(e.target.value)}
                  placeholder="seller@domain.com"
                />
                <Input
                  label="Subject"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                />
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Body</label>
                  <textarea
                    className="w-full border rounded-lg p-3 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    rows={2}
                    value={emailBody}
                    onChange={e => setEmailBody(e.target.value)}
                  />
                </div>
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="space-y-3">
                <Input
                  label="Network Name (SSID)"
                  value={wifiSsid}
                  onChange={e => setWifiSsid(e.target.value)}
                  placeholder="Shop_WiFi"
                />
                <Input
                  label="Password"
                  type="password"
                  value={wifiPassword}
                  onChange={e => setWifiPassword(e.target.value)}
                  placeholder="password123"
                />
                <Select
                  label="Security Type"
                  value={wifiEncryption}
                  onChange={e => setWifiEncryption(e.target.value)}
                  options={[
                    { value: 'WPA', label: 'WPA / WPA2 / WPA3' },
                    { value: 'WEP', label: 'WEP' },
                    { value: 'nopass', label: 'Open (No Password)' },
                  ]}
                />
              </div>
            )}

            {/* Visual Styling */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Foreground Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={e => setFgColor(e.target.value)}
                    className="w-9 h-9 p-0.5 rounded border cursor-pointer"
                  />
                  <span className="text-xs font-mono">{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Background Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                    className="w-9 h-9 p-0.5 rounded border cursor-pointer"
                  />
                  <span className="text-xs font-mono">{bgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Size ({size}px)</label>
                <input
                  type="range"
                  min="200"
                  max="800"
                  step="50"
                  value={size}
                  onChange={e => setSize(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <Card className="p-8 w-full border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Live QR Preview
            </h3>

            <div className="p-4 bg-white rounded-2xl shadow-inner border border-slate-200 inline-block mb-6">
              {pngDataUrl ? (
                <img 
                  src={pngDataUrl} 
                  alt="Generated QR" 
                  className="w-64 h-64 object-contain rounded-lg" 
                />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center text-slate-400">
                  <QrIcon className="w-12 h-12 animate-pulse" />
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-2 gap-3">
              <Button 
                onClick={downloadPNG} 
                disabled={!pngDataUrl}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download PNG
              </Button>
              <Button 
                variant="outline" 
                onClick={downloadSVG} 
                disabled={!svgString}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download SVG
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
