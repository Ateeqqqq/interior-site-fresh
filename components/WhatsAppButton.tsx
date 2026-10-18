import React from "react";

/**
 * Floating WhatsApp Contact Button
 * Connects clients directly to Atelier Living's design studio.
 * Direct business line: +91 97030 12914
 */
export default function WhatsAppButton() {
  const phoneNumber = "919703012914";
  const defaultMessage = encodeURIComponent(
    "Hello, I visited your website and would like to discuss an interior design project."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="WhatsApp Contact"
      className="fixed z-40 flex items-center justify-end pointer-events-none"
      style={{
        bottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))",
        right: "max(1.5rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))",
      }}
    >
      <div className="relative flex items-center group pointer-events-auto">
        {/* Accessible Desktop Tooltip */}
        <span
          id="whatsapp-tooltip"
          role="tooltip"
          className="hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium text-zinc-100 bg-[#141414]/95 backdrop-blur-md border border-zinc-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap mr-3.5"
        >
          Chat with us on WhatsApp
        </span>

        {/* WhatsApp Floating Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          aria-describedby="whatsapp-tooltip"
          title="Chat with us on WhatsApp"
          className="w-14 h-14 md:w-[58px] md:h-[58px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.38),0_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.55),0_4px_12px_rgba(0,0,0,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-[#0a0a0a] motion-reduce:hover:scale-100 motion-reduce:transition-none"
        >
          {/* Official Clean WhatsApp Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 md:w-[30px] md:h-[30px] fill-current"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.49 3.67 12.04 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.72 14.82 12.16 15.87C14.19 16.75 14.6 16.57 15.04 16.53C15.48 16.49 16.46 15.95 16.66 15.39C16.86 14.83 16.86 14.35 16.8 14.25C16.74 14.15 16.58 14.09 16.34 13.97C16.1 13.85 14.92 13.27 14.7 13.19C14.48 13.11 14.32 13.07 14.16 13.31C14 13.55 13.54 14.09 13.4 14.25C13.26 14.41 13.12 14.43 12.88 14.31C12.64 14.19 11.87 13.94 10.96 13.13C10.25 12.5 9.77 11.72 9.63 11.48C9.49 11.24 9.61 11.11 9.73 10.99C9.84 10.88 9.98 10.7 10.1 10.56C10.22 10.42 10.26 10.32 10.34 10.16C10.42 10 10.38 9.86 10.32 9.74C10.26 9.62 9.78 8.44 9.58 7.96C9.38 7.48 9.18 7.55 9.03 7.55C8.89 7.54 8.71 7.33 8.53 7.33Z" />
          </svg>
          <span className="sr-only">Chat with us on WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
