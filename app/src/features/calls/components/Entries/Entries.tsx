import type { ReactElement, FC } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

import type * as Types from './Entries.types';

SyntaxHighlighter.registerLanguage('json', json);

const Entries: FC<Readonly<Types.EntriesProps>> = ({ entriesForDay }): ReactElement => (
  <div className="syntaxhighlight">
    <SyntaxHighlighter
      language="json"
      showLineNumbers
      style={style}
    >
      {JSON.stringify(entriesForDay, null, 4)}
    </SyntaxHighlighter>
  </div>
);

export default Entries;
