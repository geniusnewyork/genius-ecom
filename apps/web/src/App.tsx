import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { useTheme } from './hooks/useTheme';

// Lazy load main pages
const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const AllToolsPage = React.lazy(() => import('./pages/AllToolsPage').then(module => ({ default: module.AllToolsPage })));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage').then(module => ({ default: module.CategoryPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const TermsPage = React.lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const DevTestSuitePage = React.lazy(() => import('./pages/DevTestSuitePage').then(module => ({ default: module.DevTestSuitePage })));
const PricingPage = React.lazy(() => import('./pages/PricingPage').then(module => ({ default: module.PricingPage })));
const ExtensionsPage = React.lazy(() => import('./pages/ExtensionsPage').then(module => ({ default: module.ExtensionsPage })));
const DocumentationPage = React.lazy(() => import('./pages/DocumentationPage').then(module => ({ default: module.DocumentationPage })));

// Lazy load tools - Calculators
const ProfitCalculator = React.lazy(() => import('./pages/tools/calculators/ProfitCalculator'));
const ProductPricingCalculator = React.lazy(() => import('./pages/tools/calculators/ProductPricingCalculator'));
const GSTCalculator = React.lazy(() => import('./pages/tools/calculators/GSTCalculator'));
const MarginCalculator = React.lazy(() => import('./pages/tools/calculators/MarginCalculator'));
const RTOCalculator = React.lazy(() => import('./pages/tools/calculators/RTOCalculator'));
const ReturnLossCalculator = React.lazy(() => import('./pages/tools/calculators/ReturnLossCalculator'));
const MarketplaceFeeCalculator = React.lazy(() => import('./pages/tools/calculators/MarketplaceFeeCalculator'));
const BreakEvenCalculator = React.lazy(() => import('./pages/tools/calculators/BreakEvenCalculator'));
const DiscountCalculator = React.lazy(() => import('./pages/tools/calculators/DiscountCalculator'));
const BulkPricingCalculator = React.lazy(() => import('./pages/tools/calculators/BulkPricingCalculator'));

// PDF Tools
const PDFCropper = React.lazy(() => import('./pages/tools/pdf/PDFCropper'));
const PDFMerger = React.lazy(() => import('./pages/tools/pdf/PDFMerger'));
const PDFSplitter = React.lazy(() => import('./pages/tools/pdf/PDFSplitter'));
const PDFPageExtractor = React.lazy(() => import('./pages/tools/pdf/PDFPageExtractor'));
const PDFLayoutTool = React.lazy(() => import('./pages/tools/pdf/PDFLayoutTool'));
const PDFCompressor = React.lazy(() => import('./pages/tools/pdf/PDFCompressor'));
const PDFRotator = React.lazy(() => import('./pages/tools/pdf/PDFRotator'));
const PDFPageReorder = React.lazy(() => import('./pages/tools/pdf/PDFPageReorder'));
const PDFToImage = React.lazy(() => import('./pages/tools/pdf/PDFToImage'));
const ImageToPDF = React.lazy(() => import('./pages/tools/pdf/ImageToPDF'));

// Image Tools
const ImageCompressor = React.lazy(() => import('./pages/tools/image/ImageCompressor'));
const ImageResizer = React.lazy(() => import('./pages/tools/image/ImageResizer'));
const JPGtoPNG = React.lazy(() => import('./pages/tools/image/JPGtoPNG'));
const PNGtoJPG = React.lazy(() => import('./pages/tools/image/PNGtoJPG'));
const WebPConverter = React.lazy(() => import('./pages/tools/image/WebPConverter'));
const ImageCropper = React.lazy(() => import('./pages/tools/image/ImageCropper'));
const ImageBackgroundUtility = React.lazy(() => import('./pages/tools/image/ImageBackgroundUtility'));
const ProductImageFormatter = React.lazy(() => import('./pages/tools/image/ProductImageFormatter'));
const ProductImageBatchResizer = React.lazy(() => import('./pages/tools/image/ProductImageBatchResizer'));

// Seller Tools
const SKUGenerator = React.lazy(() => import('./pages/tools/seller/SKUGenerator'));
const QRCodeGenerator = React.lazy(() => import('./pages/tools/seller/QRCodeGenerator'));
const BarcodeGenerator = React.lazy(() => import('./pages/tools/seller/BarcodeGenerator'));
const ProductLabelGenerator = React.lazy(() => import('./pages/tools/seller/ProductLabelGenerator'));
const ShippingLabelFormatter = React.lazy(() => import('./pages/tools/seller/ShippingLabelFormatter'));
const InvoiceGenerator = React.lazy(() => import('./pages/tools/seller/InvoiceGenerator'));
const ProductTitleGenerator = React.lazy(() => import('./pages/tools/seller/ProductTitleGenerator'));
const ProductDescriptionGenerator = React.lazy(() => import('./pages/tools/seller/ProductDescriptionGenerator'));
const ProductKeywordGenerator = React.lazy(() => import('./pages/tools/seller/ProductKeywordGenerator'));
const HSNHelper = React.lazy(() => import('./pages/tools/seller/HSNHelper'));
const CSVFormatter = React.lazy(() => import('./pages/tools/seller/CSVFormatter'));
const CSVCleaner = React.lazy(() => import('./pages/tools/seller/CSVCleaner'));
const BulkProductDataFormatter = React.lazy(() => import('./pages/tools/seller/BulkProductDataFormatter'));

// AI Tools
const AIProductTools = React.lazy(() => import('./pages/tools/ai/AIProductTools'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  useTheme();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="all-tools" element={<AllToolsPage />} />
            <Route path="category/:categoryId" element={<CategoryPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="extensions" element={<ExtensionsPage />} />
            <Route path="documentation" element={<DocumentationPage />} />
            <Route path="docs" element={<DocumentationPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="dev/test-suite" element={<DevTestSuitePage />} />
            <Route path="tests" element={<DevTestSuitePage />} />
            
            <Route path="tools">
              <Route path="profit-calculator" element={<ProfitCalculator />} />
              <Route path="product-pricing-calculator" element={<ProductPricingCalculator />} />
              <Route path="gst-calculator" element={<GSTCalculator />} />
              <Route path="margin-calculator" element={<MarginCalculator />} />
              <Route path="rto-calculator" element={<RTOCalculator />} />
              <Route path="return-loss-calculator" element={<ReturnLossCalculator />} />
              <Route path="marketplace-fee-calculator" element={<MarketplaceFeeCalculator />} />
              <Route path="break-even-calculator" element={<BreakEvenCalculator />} />
              <Route path="discount-calculator" element={<DiscountCalculator />} />
              <Route path="bulk-pricing-calculator" element={<BulkPricingCalculator />} />

              <Route path="pdf-cropper" element={<PDFCropper />} />
              <Route path="pdf-merger" element={<PDFMerger />} />
              <Route path="pdf-splitter" element={<PDFSplitter />} />
              <Route path="pdf-page-extractor" element={<PDFPageExtractor />} />
              <Route path="pdf-layout-tool" element={<PDFLayoutTool />} />
              <Route path="pdf-compressor" element={<PDFCompressor />} />
              <Route path="pdf-rotator" element={<PDFRotator />} />
              <Route path="pdf-page-reorder" element={<PDFPageReorder />} />
              <Route path="pdf-to-image" element={<PDFToImage />} />
              <Route path="image-to-pdf" element={<ImageToPDF />} />

              <Route path="image-compressor" element={<ImageCompressor />} />
              <Route path="image-resizer" element={<ImageResizer />} />
              <Route path="jpg-to-png" element={<JPGtoPNG />} />
              <Route path="png-to-jpg" element={<PNGtoJPG />} />
              <Route path="webp-converter" element={<WebPConverter />} />
              <Route path="image-cropper" element={<ImageCropper />} />
              <Route path="image-background" element={<ImageBackgroundUtility />} />
              <Route path="product-image-formatter" element={<ProductImageFormatter />} />
              <Route path="product-image-batch-resizer" element={<ProductImageBatchResizer />} />

              <Route path="sku-generator" element={<SKUGenerator />} />
              <Route path="qr-code-generator" element={<QRCodeGenerator />} />
              <Route path="barcode-generator" element={<BarcodeGenerator />} />
              <Route path="product-label-generator" element={<ProductLabelGenerator />} />
              <Route path="shipping-label-formatter" element={<ShippingLabelFormatter />} />
              <Route path="invoice-generator" element={<InvoiceGenerator />} />
              <Route path="product-title-generator" element={<ProductTitleGenerator />} />
              <Route path="product-description-generator" element={<ProductDescriptionGenerator />} />
              <Route path="product-keyword-generator" element={<ProductKeywordGenerator />} />
              <Route path="hsn-helper" element={<HSNHelper />} />
              <Route path="csv-formatter" element={<CSVFormatter />} />
              <Route path="csv-cleaner" element={<CSVCleaner />} />
              <Route path="bulk-product-data-formatter" element={<BulkProductDataFormatter />} />

              <Route path="ai-product-tools" element={<AIProductTools />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
