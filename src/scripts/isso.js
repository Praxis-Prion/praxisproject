// ───────────────────────────────────────
// ISSO COMMENT EMBED
// ───────────────────────────────────────
// isso is a self-hosted comment system that injects its own DOM at runtime.
// Because Astro's ClientRouter does client-side navigation without full page
// reloads, isso's embed script only runs once on the first page load and then
// never re-initializes. This function manually tears down and re-injects the
// script on every navigation so comments always appear on post pages.

function initIsso() {
  // Remove any isso embed script that's already in the DOM from a previous
  // page visit — otherwise the browser won't re-execute it on re-injection
  const existing = document.querySelector("script[data-isso]");
  if (existing) existing.remove();

  // Find the comment thread container
  const thread = document.getElementById("isso-thread");

  // Reset the thread contents so isso renders fresh on each navigation.
  // This clears any previously rendered comments and form from the last page.
  if (thread)
    thread.innerHTML =
      "<noscript>Javascript needs to be activated to view comments.</noscript>";

  // If there's no thread element on this page (i.e. we're not on a post page),
  // bail out early — no point injecting isso on non-post pages
  if (!thread) return;

  // Dynamically create and inject the isso embed script.
  // data-isso tells the embed which server to connect to.
  // The thread element's data-title attribute tells isso the post title
  // so it doesn't need to fetch the page URL to create the thread.
  const script = document.createElement("script");
  script.setAttribute("data-isso", "https://isso.praxisproject.dev/");
  script.src = "https://isso.praxisproject.dev/js/embed.min.js";

  // ── VOTE BUTTON ACTIVE STATE ──────────────────────────────────────────────
  // isso doesn't add any active class to vote buttons after clicking —
  // it only updates the vote count number. We implement the active state
  // ourselves by listening to clicks and toggling a "voted" class.
  //
  // This runs inside script.onload so we know isso's JS is ready, and inside
  // a setTimeout because isso renders its comment DOM asynchronously after
  // the script loads — we need to wait for the buttons to exist in the DOM.
  script.onload = () => {
    setTimeout(() => {
      // Find all upvote and downvote buttons isso has rendered
      document
        .querySelectorAll(".isso-upvote, .isso-downvote")
        .forEach((btn) => {
          btn.addEventListener("click", () => {
            // Walk up to the comment footer that contains both buttons,
            // so we can toggle them relative to each other
            const footer = btn.closest(".isso-comment-footer");
            if (!footer) return;

            // Get both vote buttons for this specific comment
            const upBtn = footer.querySelector(".isso-upvote");
            const downBtn = footer.querySelector(".isso-downvote");
            if (!upBtn || !downBtn) return;

            const isUpvote = btn.classList.contains("isso-upvote");

            if (isUpvote) {
              // Toggle upvote on, always clear downvote
              upBtn.classList.toggle("voted");
              downBtn.classList.remove("voted");
            } else {
              // Toggle downvote on, always clear upvote
              downBtn.classList.toggle("voted");
              upBtn.classList.remove("voted");
            }
            // Note: the "voted" class is DOM-only and resets on navigation.
            // isso doesn't expose which comments the current user has voted
            // on in its API response, so persistence across page loads would
            // require localStorage — not implemented here.
          });
        });
    }, 500); // 500ms gives isso time to render comments into the DOM
  };

  // Add the script to the page — this triggers the browser to load and
  // execute isso's embed.min.js, which renders the comment thread
  document.body.appendChild(script);
}

// Re-run on every Astro page transition, including the initial page load.
// Without this, isso would only initialize once and disappear on navigation.
document.addEventListener("astro:page-load", initIsso);