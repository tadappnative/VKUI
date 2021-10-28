export function warnOnce(zone: string) {
  const didWarn: { [msg: string]: boolean } = {};

  return (message: string, env = 'development') => {
    if (!didWarn[message] && process.env.NODE_ENV === env) {
      console.error(`[VKUI/${zone}] ${message}`);
      didWarn[message] = true;
    }
  };
}
