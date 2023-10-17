import Editor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { Event } from '../types/Trace';

export default function TextAreaJsonEditor({ value }: { value: Event }) {
  const jsonPrettyFormar = (json: Event) => {
    return JSON.stringify(json, null, 2);
  };

  return (
    <Editor
      mode="javascript"
      theme="solarized_dark"
      fontSize={18}
      defaultValue={jsonPrettyFormar(value)}
      width="100%"
      height="400px"
      style={{
        overflow: 'auto',
      }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
