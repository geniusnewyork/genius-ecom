# SECURITY POLICY & SAFEGUARDS

# MONTY GENIUS ECOM TOOLS
> Free Tools for Smart Online Sellers  
> Designed with ❤️ by Mr. Monty Genius

---

## 1. Security Principles

MONTY GENIUS ECOM TOOLS enforces strict defensive programming guidelines across both the frontend web application and the Chrome Extension.

### Key Safeguards:
1. **No `eval()` or Unsafe Code Execution:** The codebase never utilizes `eval()`, `new Function()`, or dynamic code injection.
2. **No `dangerouslySetInnerHTML`:** Text inputs and CSV contents are rendered using safe React JSX nodes and native text nodes to prevent Cross-Site Scripting (XSS).
3. **No Embedded Secrets or Hardcoded API Keys:** Zero private API keys or cloud credentials exist in the source code. AI features require user-supplied keys stored only in browser storage.
4. **Filename Sanitization:** Uploaded and exported file names are sanitized, stripping unsafe path characters (`../`, slashes, special control symbols).
5. **Client-Side File Sandboxing:** Uploaded PDFs, images, and CSV files are parsed in memory via `Blob`, `ArrayBuffer`, and `FileReader` APIs without execution permissions.
6. **No Automated Security Bypass:** The Chrome Extension strictly forbids circumventing CAPTCHAs, two-factor authentication, or security barriers on marketplace portals.

---

## 2. Content Security Policy (CSP)

The web application is designed to be compatible with a strict Content Security Policy:
```http
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' blob: data:;
connect-src 'self' https://api.openai.com https://generativelanguage.googleapis.com https://openrouter.ai http://localhost:11434;
object-src 'none';
base-uri 'self';
form-action 'self';
```

---

## 3. Reporting Vulnerabilities

If you discover any security concern or potential vulnerability in this codebase:
1. Please open an issue or contact the maintainer directly.
2. Do not publicly disclose vulnerabilities before a patch is issued.
