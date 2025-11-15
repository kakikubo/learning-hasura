// jest.setup.ts
import '@testing-library/jest-dom';
// @ts-ignore: cross-fetch type definitions may not be available
import { fetch, Request, Response, Headers } from 'cross-fetch';
import {
  TransformStream,
  ReadableStream,
  WritableStream,
} from 'web-streams-polyfill';

global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

// Jest環境ではTextEncoder/TextDecoderがグローバルに定義されていないため、
// utilパッケージから取得して設定
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder } = require('util');
  global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  const { TextDecoder } = require('util');
  global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}
if (typeof global.TransformStream === 'undefined') {
  global.TransformStream = TransformStream as typeof globalThis.TransformStream;
}
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream as typeof globalThis.ReadableStream;
}
if (typeof global.WritableStream === 'undefined') {
  global.WritableStream = WritableStream as typeof globalThis.WritableStream;
}

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
