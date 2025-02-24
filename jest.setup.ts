// jest.setup.ts
import '@testing-library/jest-dom';
import { fetch, Request, Response, Headers } from 'cross-fetch';
import { TextEncoder, TextDecoder } from 'util';
import { TransformStream } from 'web-streams-polyfill';

global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.TransformStream = TransformStream;

// BroadcastChannelのモック実装
class BroadcastChannelMock implements BroadcastChannel {
  name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;

  constructor(name: string) {
    this.name = name;
    this.onmessage = null;
    this.onmessageerror = null;
  }

  postMessage(message: any): void {}

  addEventListener<K extends keyof BroadcastChannelEventMap>(
    type: K,
    listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {}

  removeEventListener<K extends keyof BroadcastChannelEventMap>(
    type: K,
    listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void {}

  close(): void {}

  dispatchEvent(event: Event): boolean {
    return true;
  }
}

global.BroadcastChannel =
  BroadcastChannelMock as unknown as typeof BroadcastChannel;
