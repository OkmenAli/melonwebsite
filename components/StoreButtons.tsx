function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-white">
      <path d="M17.2 12.4c0-2.4 2-3.6 2.1-3.7-1.1-1.6-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.8 0-1.9-.9-3.1-.8-1.6 0-3.1.9-3.9 2.3-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0-.1-2.6-1-2.6-3.7ZM14.8 5.2c.7-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.7-1.3Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
      <path fill="#34A853" d="M4.2 2.8c-.4.3-.7.9-.7 1.6v15.2c0 .7.3 1.3.8 1.6l8.2-9.2-8.3-9.2Z" />
      <path fill="#FBBC05" d="m15.1 9.1-2.6 2.9 2.6 2.9 3.4-1.9c1.1-.6 1.1-1.4 0-2l-3.4-1.9Z" />
      <path fill="#4285F4" d="m4.3 2.8 8.2 9.2 2.6-2.9L6 3.9c-.7-.4-1.2-.8-1.7-1.1Z" />
      <path fill="#EA4335" d="m4.3 21.2 1.7-1.1 9.1-5.2-2.6-2.9-8.2 9.2Z" />
    </svg>
  );
}

export function StoreButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a className="download-badge" href="/support" aria-label="App Store placeholder">
        <AppleIcon />
        <span>
          <span className="store-kicker">Download on the</span>
          <span className="store-name">App Store</span>
        </span>
      </a>
      <a className="download-badge" href="/support" aria-label="Google Play placeholder">
        <PlayIcon />
        <span>
          <span className="store-kicker">Get it on</span>
          <span className="store-name">Google Play</span>
        </span>
      </a>
    </div>
  );
}
