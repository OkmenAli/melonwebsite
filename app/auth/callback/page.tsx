type SearchValue = string | string[] | undefined;

function firstValue(value: SearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

function classifyError(value: string) {
  if (/already[ _-]?used|consumed/i.test(value)) {
    return {
      code: "used",
      message: "This verification link has already been used. Open Melon normally to continue.",
      title: "Email already verified",
    };
  }

  if (/expired|otp_expired/i.test(value)) {
    return {
      code: "expired",
      message: "This verification link has expired. Return to Melon and request a new verification email.",
      title: "Verification link expired",
    };
  }

  return {
    code: "invalid",
    message: "This verification link is invalid or incomplete. Return to Melon and request a new verification email.",
    title: "Verification problem",
  };
}

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, SearchValue>>;
}) {
  const params = await searchParams;
  const code = firstValue(params.code)?.trim() ?? "";
  const errorCode = firstValue(params.error_code) ?? firstValue(params.errorCode) ?? "";
  const errorDescription =
    firstValue(params.error_description) ??
    firstValue(params.errorDescription) ??
    firstValue(params.error) ??
    "";

  const callbackError = errorCode || errorDescription
    ? classifyError(`${errorCode} ${errorDescription}`)
    : code
      ? null
      : classifyError("");

  const appUrl = callbackError
    ? `melon://auth/callback?error_code=${encodeURIComponent(callbackError.code)}&error_description=${encodeURIComponent(callbackError.message)}`
    : `melon://auth/callback?code=${encodeURIComponent(code)}`;

  const canOpenMelon = !callbackError || callbackError.code === "used";

  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-fog px-5 py-16 sm:px-8">
      <section className="w-full max-w-xl rounded-[32px] border border-melon-100 bg-white p-7 text-center shadow-soft sm:p-12">
        <div
          aria-hidden="true"
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-melon-50 text-3xl font-black text-melon-600"
        >
          {callbackError ? "!" : "✓"}
        </div>

        <p className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-melon-600">
          Melon account
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
          {callbackError?.title ?? "Email verified!"}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-zinc-600">
          {callbackError?.message ?? "You can now return to Melon."}
        </p>

        {canOpenMelon ? (
          <a
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-melon-600 px-6 text-base font-black text-white shadow-card transition hover:bg-melon-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500"
            href={appUrl}
          >
            Open Melon
          </a>
        ) : null}

        <div className="mt-6 rounded-[20px] bg-melon-50 px-5 py-4">
          <p className="text-sm leading-6 text-zinc-600">
            If the app does not open, open the Melon app manually to continue.
          </p>
        </div>
      </section>
    </main>
  );
}
