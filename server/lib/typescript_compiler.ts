import child_process from 'child_process'; // https://nodejs.org/api/child_process.html

export function startTypescriptCompiler(
  onErrorNotify: (message: any) => void
): child_process.ChildProcess {
  const watchOptions = ['--pretty', '--preserveWatchOutput'];

  const typescriptProcess = child_process.spawn('tsc', [
    '--watch',
    ...watchOptions
  ]);

  typescriptProcess.stdout.on('data', (data: Buffer) => {
    const message = data.toString('utf8').trim();
    console.log('[tsc:out]', message);
    if (/^[^\[]/.test(message)) {
      onErrorNotify({ error: message });
    }
  });

  typescriptProcess.stderr.on('data', (data: Buffer) => {
    console.error('[tsc:err]', data.toString('utf8').trimRight());
  });

  return typescriptProcess;
}
