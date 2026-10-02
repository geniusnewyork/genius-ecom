export type ToolCategory = 'calculators' | 'pdf' | 'image' | 'seller' | 'ai' | 'csv';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  path: string;
  keywords: string[];
  isPro: boolean;
  isNew?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CalculatorInput {
  [key: string]: number | string | boolean;
}

export interface CalculatorResult {
  label: string;
  value: number | string;
  color?: string;
  icon?: string;
}

export interface PDFToolOptions {
  quality?: number;
  format?: 'a4' | 'letter';
}

export interface ImageToolOptions {
  width?: number;
  height?: number;
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number;
}

export interface CSVData {
  headers: string[];
  rows: any[][];
}

export interface MarketplaceProfile {
  id: string;
  name: string;
  platform: 'amazon' | 'flipkart' | 'meesho' | 'other';
  commissionRate: number;
  fixedFee: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  items: any[];
  total: number;
}

export interface LabelTemplate {
  id: string;
  name: string;
  width: number;
  height: number;
}

export interface SKUConfig {
  prefix: string;
  suffix: string;
  length: number;
}

export interface QRCodeConfig {
  data: string;
  size: number;
  fgColor: string;
  bgColor: string;
}

export interface BarcodeConfig {
  data: string;
  format: 'CODE128' | 'EAN13' | 'UPC';
}

export type AIProvider = 'openai' | 'anthropic' | 'gemini';

export interface AIConfig {
  provider: AIProvider;
  model: string;
  temperature: number;
}

export type Theme = 'light' | 'dark' | 'system';

export interface UserPreferences {
  theme: Theme;
  language: string;
  currency: string;
}

export interface SearchResult {
  tool: Tool;
  score: number;
}

export interface RecentTool {
  id: string;
  timestamp: number;
}

export interface FavoriteTool {
  id: string;
  addedAt: number;
}
