<script>
  import { ChatComposer, ChatMessage, ChatPanel } from '../../src/index.js';
</script>

<ChatPanel label="Assistant conversation" busy>
  <div slot="messages">Panel reply</div>
</ChatPanel>

<ChatMessage kind="assistant" label="Assistant" time="10:42" datetime="2026-10-28T10:42:00Z">
  <p>Message reply</p>
</ChatMessage>

<ChatComposer label="Message composer" busy>
  <textarea aria-label="Message" />
</ChatComposer>
