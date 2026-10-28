<script>
  import { Button, ChatComposer, ChatMessage, ChatPanel, TextArea } from '../../src/index.js';

  let draft = '';
</script>

<section id="chat" class="mt-12 scroll-mt-20">
  <div>
    <h2 class="text-lg font-bold tracking-tight">Chat</h2>
    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
      A conversation is a transcript, messages and a composer. The host supplies the words, message content, actions and
      submit behaviour; the kit supplies the shared structure and tokens.
    </p>
    <div class="mt-4 h-[34rem] overflow-hidden rounded-ui border border-line bg-canvas">
      <ChatPanel label="Assistant conversation">
        <div slot="header" class="flex min-h-11 items-center justify-between gap-3 px-4">
          <span class="text-xs font-bold uppercase tracking-widest text-ink">Build assistant</span>
          <span class="text-whisper uppercase tracking-widest text-ink-faint">Ready</span>
        </div>
        <div
          slot="messages"
          role="log"
          aria-label="Conversation messages"
          aria-live="off"
          class="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4"
        >
          <ChatMessage kind="user" label="You" time="10:42">
            <p>Can you add a compact status line to the settings page?</p>
          </ChatMessage>
          <ChatMessage kind="assistant" label="Assistant" time="10:42">
            <p>I’ll check the existing settings layout and use its spacing and type tokens.</p>
          </ChatMessage>
          <ChatMessage kind="tool" label="Search" time="10:42">
            <p class="text-ink-soft">Found one settings header and two existing status rows.</p>
          </ChatMessage>
        </div>
        <div slot="composer" class="px-4 pb-3">
          <ChatComposer label="Message composer">
            <TextArea
              label="Message"
              placeholder="Write a message"
              rows={2}
              bind:value={draft}
              class="resize-none border-0 px-1 py-1 focus:border-0"
            />
            <svelte:fragment slot="after">
              <div class="mt-2 flex justify-end">
                <Button size="lg" on:click={() => (draft = '')}>Send</Button>
              </div>
            </svelte:fragment>
          </ChatComposer>
        </div>
      </ChatPanel>
    </div>
  </div>
</section>
