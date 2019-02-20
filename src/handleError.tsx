import { React } from './renderer/index';

const FLAGS = {
  error: false,
  errorDivExists: false
};


const ERROR_ELEMENT = (): HTMLElement => {
  const id = 'error_output_pre';
  const maybeElement = document.getElementById(id);

  if (maybeElement) {
    return maybeElement;
  } else {
    return <pre id={id} />;
  }
};

export function handleError(errorMessage: string) {
  FLAGS.error = true;

  if (FLAGS.errorDivExists) {
    // noop
  } else {
    FLAGS.errorDivExists = true;

    const body = document.querySelector('body')!;
    body.style.display = 'none';
    body.parentElement!.appendChild(
      <div className="error-overlay-tsc">
        <h1>Compile failed.</h1>
        {ERROR_ELEMENT()}
      </div>
    );
  }

  ERROR_ELEMENT().appendChild(<node>{errorMessage + '\n'}</node>);
}
