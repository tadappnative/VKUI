import { noop } from './utils';

export function warnOnce(zone: string, env = 'development') {
  if (process.env.NODE_ENV !== env) {
    return noop;
  }

  const didWarn: { [msg: string]: boolean } = {};

  return (message: string) => {
    if (!didWarn[message]) {
      console.error(`[VKUI/${zone}] ${message}`);
      didWarn[message] = true;
    }
  };
}
